import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí va la lógica de inicio de sesión
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MATCHCO</Text>
        <View style={styles.logo}>
          {/* Aquí va el logotipo */}
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>INICIO DE SESIÓN</Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#000" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="#000" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            //secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Button title="CONTINUAR" onPress={handleLogin} style={styles.button} />
        <Text style={styles.forgotPassword}>Olvidaste tu Contraseña</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
   
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    color: '#000',
  },
});

export default LoginScreen;