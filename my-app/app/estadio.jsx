import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Estadio from '../assets/icons/estadio';
import SelectPosicion from '../components/comprobacionPos'



const estadio = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escoge tu Posicion</Text>
      <Text style={styles.subtitle}>Posicion Escogida: </Text>
      <View style={styles.stadium}>
        <Estadio></Estadio> 
        <View style={styles.goal}>
        
      </View>
      </View>
      <SelectPosicion></SelectPosicion>
      {/* Espacio para la NavBar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  stadium: {
    width: 450,
    height: 450,
    alignSelf: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  goal: {

    marginBottom: 200,
    alignSelf: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
});

export default estadio;