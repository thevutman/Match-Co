import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from '../../lib/supabase';
import { useRouter } from "expo-router";
import CanchaPreview from "@/components/CanchaPreview";
import { Icon } from '@rneui/themed';
import { theme } from '@/constants/theme';
import { hp, wp } from '../../helpers/common';

const MapScreen = () => {
  const router = useRouter();
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [location, setLocation] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Se requieren permisos de ubicación para mostrar tu posición en el mapa');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(loc.coords);
    } catch (error) {
      setError('Error al obtener tu ubicación');
      console.error('Error getting location:', error);
    }
  };

  const fetchCanchas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('ubicaciones').select('*');
      if (error) throw error;
      setCanchas(data);
    } catch (error) {
      setError('Error al cargar las canchas');
      console.error('Error fetching canchas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
    fetchCanchas();
  }, []);

  const handleRefresh = () => {
    setError(null);
    getUserLocation();
    fetchCanchas();
  };

  const handleMarkerPress = (cancha) => {
    setSelectedCancha(cancha);
  };

  const handleCanchaSelect = () => {
    if (selectedCancha) {
      router.push(`/cancha/${selectedCancha.id}`);
      setSelectedCancha(null);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Icon name="refresh" size={24} color={theme.colors.primary} />
          <Text style={styles.refreshText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Cargando mapa...</Text>
        </View>
      ) : (
        <>
          {location && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
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
                  title={cancha.nombre}
                  description={cancha.descripcion}
                  onPress={() => handleMarkerPress(cancha)}
                />
              ))}
            </MapView>
          )}
          <CanchaPreview 
            cancha={selectedCancha} 
            onClose={() => setSelectedCancha(null)}
            onSelect={handleCanchaSelect}
          />
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={handleRefresh}
          >
            <Icon name="refresh" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: theme.colors.background
  },
  map: { 
    width: '100%', 
    height: '100%' 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(2)
  },
  loadingText: {
    fontSize: hp(2),
    color: theme.colors.textLight
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
    gap: hp(3)
  },
  errorText: {
    fontSize: hp(2),
    color: theme.colors.error,
    textAlign: 'center'
  },
  refreshButton: {
    position: 'absolute',
    bottom: hp(5),
    right: wp(5),
    backgroundColor: 'white',
    padding: hp(2),
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  refreshText: {
    fontSize: hp(1.8),
    color: theme.colors.primary,
    fontWeight: '500'
  }
});

export default MapScreen;
