import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

const homes = () => {
  const router = useRouter();
  const onClick = () => {
    // router.push('details', { fieldId: 1 });
    router.push('./Ubicacion')
  };
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "Cancha 1",
      latitude: 6.2442,
      longitude: -75.5812,
    },
    {
      id: 2,
      name: "Cancha 2",
      latitude: 6.2482,
      longitude: -75.5632,
    },
  ]);
  const initialRegion = {
    latitude: 6.2442,
    longitude: -75.5812,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  return (
    <View style={{flex: 1}}>
      <MapView 
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
      >
        {fields.map(field => (
          <Marker
            key={field.id}
            coordinate={{
              latitude: field.latitude,
              longitude: field.longitude,
            }}  
            onPress={onClick}
            title={field.name}
            description="Cancha disponible"
          />
        ))}
      </MapView>
    </View>
  )
}

export default homes

const styles = StyleSheet.create({})
