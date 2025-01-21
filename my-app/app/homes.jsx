// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const MapScreen = () => {
//   const [fields, setFields] = useState([
//     {
//       id: 1,
//       name: "Cancha 1",
//       latitude: 6.2442,
//       longitude: -75.5812,
//     },
//     {
//       id: 2,
//       name: "Cancha 2",
//       latitude: 6.2482,
//       longitude: -75.5632,
//     },
//   ]);

//   const initialRegion = {
//     latitude: 6.2442,
//     longitude: -75.5812,
//     latitudeDelta: 0.05,
//     longitudeDelta: 0.05,
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={initialRegion}
//         showsUserLocation
//         showsMyLocationButton
//       >
//         {fields.map(field => (
//           <Marker
//             key={field.id}
//             coordinate={{
//               latitude: field.latitude,
//               longitude: field.longitude,
//             }}  
//             title={field.name}
//             description="Cancha disponible"
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default MapScreen;

import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from 'react'

const homes = () => {
  const fields = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 2,
    longitudeDelta: 2,
  }
  return (
    <View style={{flex: 1}}>
      <MapView 
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={fields}
        showsUserLocation
        showsMyLocationButton
      />
    </View>
  )
}

export default homes

const styles = StyleSheet.create({})