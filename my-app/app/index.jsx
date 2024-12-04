import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>M</Text>
        <Text style={styles.matchcoText}>MATCHCO</Text>
      </View>
      <Text style={styles.welcomeText}>
        BIENVENIDO A MATCHCO, SI{'\n'}
        TIENES CUENTA INICIA{'\n'}
        SESION EN CASO CONTRARIO{'\n'}
        CREA CUENTA
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('inicioSesion')}>
          <Text style={styles.buttonText}>INICIAR SESION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('registrarse')}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 100,
    color: 'yellow',
  },
  matchcoText: {
    fontSize: 30,
    color: 'yellow',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default App;