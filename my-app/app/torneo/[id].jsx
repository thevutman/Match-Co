import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Avatar from "@/components/avatar";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Icon } from '@rneui/themed';
import { formatDate, formatTime } from '@/utils/dateUtils';
import { useAuth } from "@/contexts/AuthContext";
const POSICIONES = {
  "Arquero": { max: 1, icon: "sports-soccer" },
  "Defensa": { max: 4, icon: "shield" },
  "Mediocampista": { max: 4, icon: "directions-run" },
  "Delantero": { max: 2, icon: "gps-fixed" }
};

export default function TorneoDetalle() {
  const { user } = useAuth();
  // console.log("Usuario actual:", user.image);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [jugadores, setJugadores] = useState([]);
  const [torneo, setTorneo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener datos del torneo
        const { data: torneoData, error: torneoError } = await supabase
          .from("torneos")
          .select(`
            *,
            horario_cancha:horario_id (
              fecha,
              hora
            )
          `)
          .eq("id", id)
          .single();

        if (torneoError) throw torneoError;
        setTorneo(torneoData);

        // Obtener jugadores
        const { data: jugadoresData, error: jugadoresError } = await supabase
          .from("torneos_jugadores")
          .select(`
            posicion,
            users:usuario_id (
              name,
              image
            )
          `)
          .eq("torneo_id", id);

        if (jugadoresError) throw jugadoresError;
        setJugadores(jugadoresData);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("Error al cargar los datos del torneo");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Loading text="Cargando torneo..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button 
          title="Reintentar" 
          onPress={() => router.replace(`/torneo/${id}`)}
        />
      </View>
    );
  }

  if (!torneo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró el torneo</Text>
      </View>
    );
  }

  const jugadoresPorPosicion = jugadores.reduce((acc, jugador) => {
    if (!acc[jugador.posicion]) {
      acc[jugador.posicion] = [];
    }
    acc[jugador.posicion].push(jugador);
    return acc;
  }, {});

  const renderPosicion = (posicion, config) => {
    const jugadoresEnPosicion = jugadoresPorPosicion[posicion] || [];
    const cuposDisponibles = config.max - jugadoresEnPosicion.length;

    return (
      <View key={posicion} style={styles.posicionContainer}>
        <View style={styles.posicionHeader}>
          <Icon 
            name={config.icon} 
            type="material" 
            size={24} 
            color={theme.colors.primary} 
          />
          <Text style={styles.posicionTitle}>
            {posicion} ({jugadoresEnPosicion.length}/{config.max})
          </Text>
        </View>
        
        <View style={styles.jugadoresContainer}>
          {jugadoresEnPosicion.map((jugador, index) => (
            <View key={index} style={styles.jugadorCard}>
              {/* <Avatar
                uri={jugador.users?.image}
                size={hp(8)}
                rounded={theme.radius.xxl}
                style={styles.avatar}
              /> */}
              <Avatar
                uri={user.image}
                size={hp(8)}
                rounded={theme.radius.xxl * 1.4}
                style={styles.avatar}
              />
              <Text style={styles.jugadorName}>{jugador.users.name}</Text>
            </View>
          ))}
          
          {Array(cuposDisponibles).fill(null).map((_, index) => (
            <View key={`empty-${index}`} style={styles.cupoVacio}>
              <Icon 
                name="person-add" 
                type="material" 
                size={24} 
                color={theme.colors.textLight} 
              />
              <Text style={styles.cupoVacioText}>Cupo disponible</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton router={router}/>
      
      <View style={styles.header}>
        <Text style={styles.title}>{torneo.nombre}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="event" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              {formatDate(torneo.horario_cancha.fecha)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="schedule" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              {formatTime(torneo.horario_cancha.hora)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="group" size={20} color={theme.colors.primary} />
            <Text style={styles.infoText}>
              {jugadores.length}/{torneo.max_jugadores} jugadores
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posiciones</Text>
        {Object.entries(POSICIONES).map(([posicion, config]) => 
          renderPosicion(posicion, config)
        )}
      </View>

      <View style={styles.chatButtonContainer}>
        <Button 
          title="Ir al Chat del Torneo" 
          onPress={() => router.push(`/torneo/${id}/chat`)}
          icon={{
            name: 'chat',
            type: 'material',
            size: 20,
            color: 'white'
          }}
          iconPosition="left"
        />
      </View>
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
    marginBottom: hp(2),
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: wp(4),
    borderRadius: theme.radius.md,
    gap: hp(1),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  infoText: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
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
  posicionContainer: {
    backgroundColor: 'white',
    borderRadius: theme.radius.md,
    padding: wp(4),
    marginBottom: hp(2),
  },
  posicionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginBottom: hp(2),
  },
  posicionTitle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: theme.colors.textDark,
  },
  jugadoresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(3),
  },
  jugadorCard: {
    alignItems: 'center',
    width: wp(20),
  },
  avatar: {
    marginBottom: hp(1),
  },
  jugadorName: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  cupoVacio: {
    width: wp(20),
    height: hp(12),
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(0.5),
  },
  cupoVacioText: {
    fontSize: hp(1.2),
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  chatButtonContainer: {
    padding: wp(4),
    marginBottom: hp(2),
  },
});
