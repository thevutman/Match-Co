import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react'
import Botones from '../components/botones'

const Ubicacion = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Señor Gol</Text>
      </View>
      /*Aqui va la imagen*/
      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.Text}> Direccion: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.Text}>Capacidad: </Text>
        </View> 
      </View>
      <View>
        <Botones />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CONFIRMAR</Text>
      </TouchableOpacity>
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>NavBar</Text>
      </View>
    </View>
  )
}

export default Ubicacion

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#90EE90',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    marginTop: 20,
    width: '80%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  Text: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#90EE90',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
})