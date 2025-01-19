import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { supabase } from '@/lib/supabase'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout = () => {
  const {setAuth} = useAuth();
 //const router =useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user);

      if(session){
        // set auth
        // move to home page
        /*
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.replaced('/home');
        */
      }
      else{
        // set auth null
        // move to welcome page
        /*
        setAuth(null);
        router.replace('/welcome');
        */
      }
    })
  }/* [] */);
  /* 
  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    if (res.success) setUserData({...res.data, email});
    }
  */
  return (
    <Stack
        screenOptions={{
            headerShown: false
        }}
    />
  )
}

export default _layout