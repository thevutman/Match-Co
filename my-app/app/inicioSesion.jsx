import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter()
  const emailRef = useRef("");
  const passwordRef = useRef("");
  

  const handleLogin = async () => {
      if(!emailRef.current || !passwordRef.current){
        Alert.alert('Inicia Sesion', 'Llena todos los campos')
        return;
      }
      let email = emailRef.current.trim();
      let password = passwordRef.current.trim();
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('error: ', error);
      if (error){
        Alert.alert('Inicio Sesion', error.message);
      }
  }

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
            onChangeText={value => emailRef.current = value}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="key" size={20} color="#000" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={value => passwordRef.current = value}
            secureTextEntry
          />
        </View>
        <Button title="CONTINUAR" onPress={handleLogin} style={styles.button} />
        </View>
        //FOOTER
        <View backgroundColor = "blue">
        <Text style={styles.forgotPassword}>¿Olvidaste tu Contraseña?</Text>
        <Pressable onPress={() => router.push('recuperarContraseña')}>
        <Text style={styles.forgotPassword}>Recuperala</Text>
        </Pressable>
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
  forgotPassword:{
    backgroundColor: '#fff',
  }
});

export default LoginScreen;