import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

const formsContraseña = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleNewPassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Éxito', 'Contraseña actualizada. Inicia sesión con la nueva clave.');
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleNewPassword}>
        <Text style={styles.buttonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

export default formsContraseña;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});