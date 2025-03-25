import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Modal, Pressable, FlatList  } from "react-native";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";


export default function CanchaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [cancha, setCancha] = useState(null);
  const [torneos, setTorneos] = useState([]);
  const [nuevoTorneo, setNuevoTorneo] = useState({ nombre: "", fecha: "", maxJugadores: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [selectedPosicion, setSelectedPosicion] = useState("");

  const posiciones = ["Delantero", "Mediocampista", "Defensa", "Arquero"];

  useEffect(() => {
    const fetchCancha = async () => {
      const { data, error } = await supabase.from("ubicaciones").select("*").eq("id", id).single();
      if (error) console.error("Error al cargar la cancha:", error);
      else setCancha(data);
    };

    const fetchTorneos = async () => {
      const { data, error } = await supabase.from("torneos").select("*").eq("cancha_id", id);
      if (error) console.error("Error cargando torneos:", error);
      else setTorneos(data);
    };

    if (id) {
      fetchCancha();
      fetchTorneos();
    }
  }, [id]);

  const crearTorneo = async () => {
    const { data, error } = await supabase.from("torneos").insert([
      {
        nombre: nuevoTorneo.nombre,
        fecha: nuevoTorneo.fecha,
        max_jugadores: Number(nuevoTorneo.maxJugadores),
        cancha_id: id,
      },
    ]);

    if (error) {
      console.error("Error creando torneo:", error);
    } else {
      setTorneos([...torneos, data[0]]);
      setNuevoTorneo({ nombre: "", fecha: "", maxJugadores: "" });
    }
  };

  const unirseTorneo = async () => {
    const { data: usuario } = await supabase.auth.getUser();
    if (!usuario) return alert("Debes iniciar sesión");
  
    const { error } = await supabase.from("torneos_jugadores").insert([
      { torneo_id: selectedTorneo, usuario_id: usuario.user.id, posicion: selectedPosicion },
    ]);
  
    if (error) {
      console.error("Error al unirse:", error);
    } else {
      alert(`¡Te has unido como ${selectedPosicion}!`);
      setModalVisible(false);
    }
  };
  

  if (!cancha) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <BackButton router={router} />
      <Text style={styles.title}>{cancha.nombre}</Text>
      <Text>{cancha.descripcion}</Text>
      <Text>📍 {cancha.direccion}</Text>

      <Text style={styles.subtitle}>Crear Torneo</Text>
      <TextInput placeholder="Nombre del torneo" value={nuevoTorneo.nombre} onChangeText={(text) => setNuevoTorneo({ ...nuevoTorneo, nombre: text })} style={styles.input} />
      <TextInput placeholder="Fecha (YYYY-MM-DD)" value={nuevoTorneo.fecha} onChangeText={(text) => setNuevoTorneo({ ...nuevoTorneo, fecha: text })} style={styles.input} />
      <TextInput placeholder="Máx. Jugadores" value={nuevoTorneo.maxJugadores} onChangeText={(text) => setNuevoTorneo({ ...nuevoTorneo, maxJugadores: text })} style={styles.input} keyboardType="numeric" />
      <Button title="Crear Torneo" onPress={crearTorneo} />
    
      <Text style={styles.subtitle}>Torneos disponibles</Text>
      {torneos.map((torneo) => (
        <View key={torneo.id} style={styles.torneoCard}>
          <Text>{torneo.nombre}</Text>
          <Text>📅 {torneo.fecha}</Text>
          <Text>👥 {torneo.max_jugadores} jugadores</Text>
          <Button title="Unirme" onPress={() => { setSelectedTorneo(torneo.id); setModalVisible(true); }} />
          <Button title="Ver jugadores inscritos" onPress={() => router.push(`/torneo/${torneo.id}`)} />
        </View>
      ))}

      {/* Modal de selección de posición */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu posición</Text>
            <FlatList
              data={posiciones}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable onPress={() => setSelectedPosicion(item)} style={styles.option}>
                  <Text style={{ color: selectedPosicion === item ? "blue" : "black" }}>{item}</Text>
                </Pressable>
              )}
            />
            <Button title="Unirme" onPress={unirseTorneo} disabled={!selectedPosicion} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 18, marginTop: 10, fontWeight: "bold" },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  torneoCard: { padding: 10, borderWidth: 1, marginVertical: 5, borderRadius: 5 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  option: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});
