import { View, Text, Button, Alert } from 'react-native';
import React from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const home = () => {
    const {setAuth} = useAuth();

    const onLogout = async ()=>{
        setAuth(null);
        const {error} = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Cerrar Sesion', 'Error al cerrar sesion')
        }
    }
  return (
    <View>
      <Text>home</Text>
      <Button title="logout"onPress={onLogout}></Button>
    </View>
  )
}

export default home