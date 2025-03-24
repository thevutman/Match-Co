import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { fetchCanchaById } from "../../services/fetchUbicacionesById";
import BackButton from "@/components/BackButton";

export default function CanchaDetailScreen() {
  const { id } = useLocalSearchParams(); // Obtiene el ID de la URL
  const router = useRouter();
  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCancha = async () => {
      try {
        const data = await fetchCanchaById(id);
        setCancha(data);
      } catch (error) {
        console.error("Error cargando cancha:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCancha();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <BackButton router={router} />
      <Text>{cancha?.nombre}</Text>
      <Text>{cancha?.descripcion}</Text>
      <Text>{cancha?.direccion}</Text>
    </View>
  );
}
