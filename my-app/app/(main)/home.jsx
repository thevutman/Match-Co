import { Alert,Button, StyleSheet,Text, View } from "react-native"
import React from 'react';
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";


const Home = () => {

  const{user, setAuth} = useAuth();

  console.log('user: ', user);

  const onLogout = async ()=>{
    // setAuth(null);
    const {error} = await supabase.auth.signOut();
    if(error){
      Alert.alert('Sign out', "Error signing out!")
    }
  }

  return(
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title="logout" onPress={onLogout}/>
    </ScreenWrapper>
  )

}

export default Home