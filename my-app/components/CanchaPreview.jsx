import { View, Text, Button, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";

export default function CanchaPreview({ cancha, onClose }) {
  const sheetRef = useRef(null); // Removed TypeScript-specific type annotation
  const router = useRouter();

  // Cerrar el sheet cuando la cancha cambia
  useEffect(() => {
    if (cancha) {
      sheetRef.current?.expand();
    }
  }, [cancha]);

  if (!cancha) return null;

  return (
    <BottomSheet ref={sheetRef} index={1} snapPoints={["10%", "30%"]}>
      <View style={styles.container}>
        <Text style={styles.title}>{cancha.nombre}</Text>
        <Text>{cancha.descripcion}</Text>
        <Text>{cancha.direccion}</Text>
        <Button title="Ver más" onPress={() => router.push(`/cancha/${cancha.id}`)} />
        <Button title="Cerrar" color="red" onPress={onClose} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold" },
});