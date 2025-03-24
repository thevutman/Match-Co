import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from '../../lib/supabase';
import { useRouter } from "expo-router";
import CanchaPreview from "@/components/CanchaPreview";

const MapScreen = () => {
  const router = useRouter();
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [location, setLocation] = useState(null);
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log('loc', loc);
      setLocation(loc.coords);
    };

    const fetchCanchas = async () => {
      const { data, error } = await supabase.from('ubicaciones').select('*');
      if (!error) setCanchas(data);
    };

    getUserLocation();
    fetchCanchas();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 6.2442,
            longitude: -75.5812,
            // latitude: location ? location.latitude : 6.2442,
            // longitude: location ? location.longitude : -75.5812,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {canchas.map((cancha) => (
            <Marker
              key={cancha.id}
              coordinate={{
                latitude: cancha.latitud,
                longitude: cancha.longitud,
              }}
              title={cancha.nombre}
              description={cancha.descripcion}
              onPress={() => router.push(`/cancha/${cancha.id}`)}            />
                // onPress={() => setSelectedCancha(cancha)}            />
          ))}
        </MapView>
      )}
      <CanchaPreview cancha={selectedCancha} onClose={() => setSelectedCancha(null)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
});

export default MapScreen;
