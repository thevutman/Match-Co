import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

const Homes = () => {
  const router = useRouter();
  const [canchas, setCanchas] = useState([]);

  // Obtener canchas de Supabase
  useEffect(() => {
    const fetchCanchas = async () => {
      const { data, error } = await supabase.from("ubicaciones").select("*");
      if (error) console.error("Error obteniendo canchas:", error);
      else setCanchas(data);
    };

    fetchCanchas();
  }, []);

  // Cuando se presiona una cancha, navegar a la pantalla de detalles con la información
  const onPressCancha = async (cancha) => {
    const { data: torneos, error } = await supabase
      .from("torneo")
      .select("*")
      .eq("cancha_id", cancha.id);

    if (error) {
      console.error("Error obteniendo torneos:", error);
      return;
    }

    router.push({
      pathname: "/Ubicacion",
      params: {
        canchaId: cancha.id,
        nombre: cancha.Nombre,
        latitud: cancha.latitud,
        longitud: cancha.longitud,
        descripcion: cancha.descripcion,
        torneos: JSON.stringify(torneos), // Enviar los torneos como string
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.2442,
          longitude: -75.5812,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {canchas.map((cancha) => (
          <Marker
            key={cancha.id}
            coordinate={{
              latitude: cancha.latitud,
              longitude: cancha.longitud,
            }}
            onPress={() => onPressCancha(cancha)}
            title={cancha.Nombre}
            description="Cancha disponible"
          />
        ))}
      </MapView>
    </View>
  );
};

export default Homes;
