import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import Avatar from "@/components/avatar";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

export default function TorneoDetalle() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      const { data, error } = await supabase
        .from("torneos_jugadores")
        .select("posicion, users:users(name, image)")
        .eq("torneo_id", id);

      if (error) console.error("Error cargando jugadores", error);
      else setJugadores(data);
    };

    fetchJugadores();
  }, [id]);

  return (
    <View style={styles.container}>
      <BackButton router={router}/>
      <Text style={styles.title}>Jugadores inscritos</Text>
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.users.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Avatar
                uri={item?.users.image}
                size={hp(12)}
                rounded={theme.radius.xxl*1.4}
                style={styles.avatar}
            /> 
            {/* <Image source={{ uri: item.users.image }} style={styles.avatar} /> */}
            <View>
              <Text style={styles.name}>{item.users.name}</Text>
              <Text style={styles.position}>{item.posicion}</Text>
            </View>
          </View>
        )}
      />
      <Button title="Abrir chat del torneo" onPress={() => router.push(`/torneo/${id}/chat`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#f0f0f0", marginVertical: 5, borderRadius: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  position: { fontSize: 14, color: "gray" },
});
