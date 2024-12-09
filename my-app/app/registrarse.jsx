import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter()
  const userRef = useRef ("")
  const emailRef = useRef("");
  const passwordRef = useRef("");
 

  const handleLogin = async () => {
      if(!emailRef.current || !passwordRef.current || !userRef.current){
        Alert.alert('Inicia Sesion', 'Llena todos los campos')
        return;
      }
      let name = nameRef.current.trim();
      let email = emailRef.current.trim();
      let password = passwordRef.current.trim();

      const {data: {session} , error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          data:{
            name
          }
        }
      });

      console.log("Session", session);
      console.log("error", error);
      if (error){
        Alert.alert('Crear cuenta', error.message);
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
        <Text style={styles.formTitle}>CREAR CUENTA</Text>
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
        <Button title="Registrarse" onPress={handleLogin} style={styles.button} />
        </View>
        //FOOTER
        <View backgroundColor = "blue">
        <Text style={styles.forgotSesion}>Ya tienes cuenta?</Text>
        <Pressable onPress={() => router.push('inicioSesion')}>
        <Text style={styles.forgotSesion}>Inicia Sesion</Text>
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
  forgotSesion:{
    backgroundColor: '#fff',
  }
});

export default RegisterScreen;