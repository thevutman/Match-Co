import React, { useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";

const Ubicacion = () => {
  const router = useRouter();
  const cancha = useLocalSearchParams();

  // const { cancha } = route.params;

  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([
    { label: '15 de marzo 2025', value: '2025-03-15' },
    { label: '16 de marzo 2025', value: '2025-03-16' },
    { label: '17 de marzo 2025', value: '2025-03-17' },
  ]);

  const [openTime, setOpenTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [times, setTimes] = useState([
    { label: '10:00 AM', value: '10:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '6:00 PM', value: '18:00' },
  ]);

  const handleNavigation = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${cancha.latitud},${cancha.longitud}`;
    Linking.openURL(url);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      router.push({ pathname: '/SeleccionarPosicion', params: { cancha, selectedDate, selectedTime } });
    } else {
      alert('Por favor selecciona una fecha y una hora antes de continuar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cancha.Nombre}</Text>
      <Text>{cancha.descripcion}</Text>
      <Button title="Cómo llegar" onPress={handleNavigation} />

      <Text style={styles.label}>Selecciona la fecha:</Text>
      <DropDownPicker
        open={openDate}
        value={selectedDate}
        items={dates}
        setOpen={setOpenDate}
        setValue={setSelectedDate}
        setItems={setDates}
        placeholder="Selecciona una fecha"
        style={styles.picker}
      />

      <Text style={styles.label}>Selecciona la hora:</Text>
      <DropDownPicker
        open={openTime}
        value={selectedTime}
        items={times}
        setOpen={setOpenTime}
        setValue={setSelectedTime}
        setItems={setTimes}
        placeholder="Selecciona una hora"
        style={styles.picker}
      />

      <Button title="Continuar" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 20, fontSize: 16, fontWeight: '500' },
  picker: { marginBottom: 20 },
});

// import React, { useState } from 'react';
// import { View, Text, Button, Linking, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from "expo-router";

// const Ubicacion = () => {
//   const params = useLocalSearchParams();
//   console.log("Parámetros recibidos:", params); // Para depuración

//   if (!params || !params.canchaId) {
//     return <Text>Error: No se recibieron datos</Text>;
//   }
  
//   return (
//     <View>
//       <Text>{params.nombre}</Text>
//       <Text>{params.descripcion}</Text>
//       {/* Más elementos aquí */}
//     </View>
//   );
// };

export default Ubicacion;