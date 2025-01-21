import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Posicion from '../assets/icons/poisicionSelec';

const posicionSeleccionada = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
      <Posicion/>
      </View>
      <Text style={styles.message}>
        Tu Posicion Fue Seleccionada con Exito
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>INICIO</Text>
      </TouchableOpacity>
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
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  message: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#BDDF37',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default posicionSeleccionada;
