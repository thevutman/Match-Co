import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, FlatList, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Input from "@/components/Input";
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { Icon } from '@rneui/themed';
import { formatDate, formatTime, isHorarioDisponible } from '@/utils/dateUtils';

export default function CanchaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [cancha, setCancha] = useState(null);
  const [torneos, setTorneos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [nuevoTorneo, setNuevoTorneo] = useState({
    nombre: "",
    maxJugadores: "",
  });
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [selectedPosicion, setSelectedPosicion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [torneosParticipando, setTorneosParticipando] = useState([]);

  const posiciones = ["Delantero", "Mediocampista", "Defensa", "Arquero"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener usuario actual
        const { data: { user } } = await supabase.auth.getUser();
        setUsuarioActual(user);

        // Obtener datos de la cancha
        const { data: canchaData, error: canchaError } = await supabase
          .from("ubicaciones")
          .select("*")
          .eq("id", id)
          .single();

        if (canchaError) throw canchaError;
        setCancha(canchaData);

        // Obtener torneos activos
        const { data: torneosData, error: torneosError } = await supabase
          .from("torneos")
          .select(`
            *,
            horario_cancha:horario_id (
              fecha,
              hora
            )
          `)
          .eq("cancha_id", id)
          .eq("estado", "activo");

        if (torneosError) throw torneosError;
        setTorneos(torneosData);

        // Obtener torneos donde participa el usuario
        if (user) {
          const { data: torneosParticipandoData } = await supabase
            .from("torneos_jugadores")
            .select("torneo_id")
            .eq("usuario_id", user.id);
          
          setTorneosParticipando(torneosParticipandoData?.map(t => t.torneo_id) || []);
        }

        // Obtener horarios disponibles
        const { data: horariosOcupados, error: horariosError } = await supabase
          .from("torneos")
          .select("horario_id")
          .eq("cancha_id", id)
          .eq("estado", "activo");

        if (horariosError) throw horariosError;

        const idsOcupados = horariosOcupados.map((h) => h.horario_id);
        let query = supabase
          .from("horario_canchas")
          .select("*")
          .eq("cancha_id", id)
          .gte("fecha", new Date().toISOString().split('T')[0]);

        if (idsOcupados.length > 0) {
          query = query.not("id", "in", `(${idsOcupados.join(',')})`);
        }

        const { data: horariosData, error: horariosDisponiblesError } = await query;
        if (horariosDisponiblesError) throw horariosDisponiblesError;
        setHorarios(horariosData);

      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("Error al cargar los datos de la cancha");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const crearTorneo = async () => {
    try {
      if (!usuarioActual) {
        setError("Debes iniciar sesión para crear un torneo");
        return;
      }

      if (!nuevoTorneo.nombre || !horarioSeleccionado || !nuevoTorneo.maxJugadores) {
        setError("Por favor completa todos los campos");
        return;
      }

      const { data, error } = await supabase.from("torneos").insert([
        {
          nombre: nuevoTorneo.nombre,
          horario_id: horarioSeleccionado,
          max_jugadores: Number(nuevoTorneo.maxJugadores),
          cancha_id: id,
          jugadores_actuales: 0,
          estado: "activo"
        },
      ]).select().single();

      if (error) throw error;

      // Limpiar formulario
      setNuevoTorneo({ nombre: "", maxJugadores: "" });
      setHorarioSeleccionado("");
      
      // Actualizar lista de torneos
      const { data: torneosData } = await supabase
        .from("torneos")
        .select(`
          *,
          horario_cancha:horario_id (
            fecha,
            hora
          )
        `)
        .eq("cancha_id", id)
        .eq("estado", "activo");
      
      setTorneos(torneosData);
    } catch (err) {
      console.error("Error creando torneo:", err);
      setError("Error al crear el torneo");
    }
  };

  const unirseTorneo = async () => {
    try {
      if (!usuarioActual) {
        setError("Debes iniciar sesión para unirte a un torneo");
        return;
      }

      const { error } = await supabase.from("torneos_jugadores").insert([
        { 
          torneo_id: selectedTorneo, 
          usuario_id: usuarioActual.id, 
          posicion: selectedPosicion 
        },
      ]);

      if (error) throw error;
      
      // Actualizar contador de jugadores
      const torneo = torneos.find(t => t.id === selectedTorneo);
      const { error: updateError } = await supabase
        .from("torneos")
        .update({ jugadores_actuales: (torneo.jugadores_actuales || 0) + 1 })
        .eq("id", selectedTorneo);

      if (updateError) throw updateError;

      setModalVisible(false);
      setSelectedPosicion("");
      setTorneosParticipando([...torneosParticipando, selectedTorneo]);
      
      // Actualizar lista de torneos
      const { data: torneosData } = await supabase
        .from("torneos")
        .select(`
          *,
          horario_cancha:horario_id (
            fecha,
            hora
          )
        `)
        .eq("cancha_id", id)
        .eq("estado", "activo");
      
      setTorneos(torneosData);
    } catch (err) {
      console.error("Error al unirse al torneo:", err);
      setError("Error al unirte al torneo");
    }
  };

  const esParticipante = (torneoId) => {
    return torneosParticipando.includes(torneoId);
  };

  if (loading) {
    return <Loading text="Cargando cancha..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button 
          title="Reintentar" 
          onPress={() => router.replace(`/cancha/${id}`)}
        />
      </View>
    );
  }

  if (!cancha) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la cancha</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <BackButton router={router} />
      
      <View style={styles.header}>
        <Text style={styles.title}>{cancha.nombre}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={20} color={theme.colors.primary} />
          <Text style={styles.locationText}>{cancha.direccion}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{cancha.descripcion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crear Nuevo Torneo</Text>
        <View style={styles.createTorneoForm}>
          <Input 
            label="Nombre del Torneo"
            value={nuevoTorneo.nombre}
            onChangeText={(text) => setNuevoTorneo({...nuevoTorneo, nombre: text})}
            placeholder="Ej: Torneo de Fin de Semana"
          />
          <View style={styles.horarioContainer}>
            <Text style={styles.label}>Selecciona un horario:</Text>
            <Picker
              selectedValue={horarioSeleccionado}
              onValueChange={(itemValue) => setHorarioSeleccionado(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona un horario" value="" />
              {horarios.map((horario) => (
                <Picker.Item 
                  key={horario.id} 
                  label={`${formatDate(horario.fecha)} - ${formatTime(horario.hora)}`} 
                  value={horario.id} 
                />
              ))}
            </Picker>
          </View>
          <Input 
            label="Máximo de Jugadores"
            value={nuevoTorneo.maxJugadores}
            onChangeText={(text) => setNuevoTorneo({...nuevoTorneo, maxJugadores: text})}
            keyboardType="numeric"
            placeholder="Ej: 10"
          />
          <Button 
            title="Crear Torneo" 
            onPress={crearTorneo}
            disabled={!nuevoTorneo.nombre || !horarioSeleccionado || !nuevoTorneo.maxJugadores}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Torneos Activos</Text>
        {torneos.length > 0 ? (
          <View style={styles.torneosContainer}>
            {torneos.map((item) => (
              <View key={item.id} style={styles.torneoCard}>
                <View style={styles.torneoHeader}>
                  <Text style={styles.torneoTitle}>{item.nombre}</Text>
                  <View style={styles.torneoStatus}>
                    <Text style={styles.jugadoresText}>
                      {item.jugadores_actuales}/{item.max_jugadores} jugadores
                    </Text>
                  </View>
                </View>
                <View style={styles.torneoInfo}>
                  <Icon name="event" size={16} color={theme.colors.textLight} />
                  <Text style={styles.torneoText}>
                    {formatDate(item.horario_cancha.fecha)}
                  </Text>
                  <Icon name="schedule" size={16} color={theme.colors.textLight} />
                  <Text style={styles.torneoText}>
                    {formatTime(item.horario_cancha.hora)}
                  </Text>
                </View>
                <View style={styles.torneoActions}>
                  {esParticipante(item.id) ? (
                    <View style={styles.actionButtonsContainer}>
                      <Button 
                        title="Ver Posiciones" 
                        onPress={() => router.push(`/torneo/${item.id}`)}
                        style={[styles.actionButton, styles.secondaryButton]}
                        icon={{
                          name: 'group',
                          type: 'material',
                          size: 20,
                          color: theme.colors.primary
                        }}
                        iconPosition="left"
                      />
                      <Button 
                        title="Ir al Chat" 
                        onPress={() => router.push(`/torneo/${item.id}/chat`)}
                        style={styles.actionButton}
                        icon={{
                          name: 'chat',
                          type: 'material',
                          size: 20,
                          color: 'white'
                        }}
                        iconPosition="left"
                      />
                    </View>
                  ) : (
                    <Button 
                      title="Unirme" 
                      onPress={() => { 
                        setSelectedTorneo(item.id); 
                        setModalVisible(true); 
                      }}
                      style={styles.actionButton}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>No hay torneos activos</Text>
        )}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu posición</Text>
            <FlatList
              data={posiciones}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable 
                  onPress={() => setSelectedPosicion(item)} 
                  style={[
                    styles.option,
                    selectedPosicion === item && styles.selectedOption
                  ]}
                >
                  <Text style={[
                    styles.optionText,
                    selectedPosicion === item && styles.selectedOptionText
                  ]}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <View style={styles.modalActions}>
              <Button 
                title="Unirme" 
                onPress={unirseTorneo} 
                disabled={!selectedPosicion}
                style={styles.modalButton}
              />
              <Button 
                title="Cancelar" 
                onPress={() => {
                  setModalVisible(false);
                  setSelectedPosicion("");
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
    gap: hp(3),
  },
  errorText: {
    fontSize: hp(2),
    color: theme.colors.error,
    textAlign: 'center',
  },
  header: {
    padding: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: '600',
    color: theme.colors.textDark,
    marginBottom: hp(1),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  locationText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: wp(4),
    marginHorizontal: wp(4),
    borderRadius: theme.radius.md,
    marginBottom: hp(3),
  },
  description: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    lineHeight: hp(2.4),
  },
  section: {
    padding: wp(4),
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: theme.colors.textDark,
    marginBottom: hp(2),
  },
  createTorneoForm: {
    gap: hp(2),
  },
  horarioContainer: {
    gap: hp(1),
  },
  label: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  picker: {
    height: hp(6),
  },
  torneoCard: {
    backgroundColor: 'white',
    padding: wp(4),
    borderRadius: theme.radius.md,
    marginBottom: hp(2),
  },
  torneoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  torneoTitle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: theme.colors.textDark,
    flex: 1,
  },
  torneoStatus: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: theme.radius.sm,
  },
  jugadoresText: {
    fontSize: hp(1.6),
    color: theme.colors.primary,
    fontWeight: '500',
  },
  torneoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(1),
  },
  torneoText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  torneoActions: {
    marginTop: hp(2),
  },
  actionButtonsContainer: {
    gap: hp(1),
  },
  actionButton: {
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  noDataText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    textAlign: 'center',
    marginTop: hp(2),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: theme.radius.lg,
    padding: wp(4),
    maxHeight: hp(60),
  },
  modalTitle: {
    fontSize: hp(2.2),
    fontWeight: '600',
    color: theme.colors.textDark,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  option: {
    padding: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary + '20',
  },
  optionText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  modalActions: {
    marginTop: hp(2),
    gap: hp(1),
  },
  modalButton: {
    marginTop: hp(1),
  },
  torneosContainer: {
    gap: hp(2),
  },
});
