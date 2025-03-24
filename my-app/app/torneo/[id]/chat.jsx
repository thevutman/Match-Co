import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Button, StyleSheet, Image } from "react-native";
import { supabase } from "@/lib/supabase";

export default function ChatTorneo() {
  const { id } = useLocalSearchParams();
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchMensajes = async () => {
      const { data, error } = await supabase
        .from("mensajes")
        .select("mensaje, creado_en, users:users(name, image)")
        .eq("torneo_id", id)
        .order("creado_en", { ascending: true });

      if (error) console.error("Error cargando mensajes", error);
      else setMensajes(data);
      console.log('mensajes: ', data);
    };

    fetchMensajes();

    // Escuchar nuevos mensajes en tiempo real
    const subscription = supabase
      .channel("mensajes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "mensajes" }, (payload) => {
        setMensajes((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  const enviarMensaje = async () => {
    const { data: usuario } = await supabase.auth.getUser();
    if (!usuario) return alert("Debes iniciar sesión");
    // console.log('usuario actual: ', usuario.user.id);
    if (!mensaje.trim()) return;

    const { error } = await supabase.from("mensajes").insert([
      { torneo_id: id, usuario_id: usuario.user.id, mensaje },
    ]);

    if (error) console.error("Error enviando mensaje", error);
    else setMensaje("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensajes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            {/* <Image source={{ uri: item.users.image }} style={styles.avatar} /> */}
            <View>
              <Text style={styles.name}>{item.users.name}</Text>
              <Text style={styles.text}>{item.mensaje}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput value={mensaje} onChangeText={setMensaje} placeholder="Escribe un mensaje..." style={styles.input} />
        <Button title="Enviar" onPress={enviarMensaje} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  message: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontSize: 14, fontWeight: "bold" },
  text: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", borderTopWidth: 1, padding: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5 },
});
