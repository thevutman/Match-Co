import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { supabase } from '@/lib/supabase'
import FetchUbis from '../components/fetchUbicaciones'

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
      <FetchUbis></FetchUbis>
    </AuthProvider>
  )
}

const MainLayout = () => {
  const {setAuth} = useAuth();
 const router =useRouter();
  useEffect(() => {
    console.log('router');
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('auth state changed');
      console.log('session user: ', session?.user?.id);

      if(session){
        setAuth(session?.user);
        // updateUserData(session?.user, session?.user?.email);
        router.replace('/homes');
      }
      else{
        setAuth(null);
        router.replace('/welcome');
      }
    })
    console.log('exiting');
  }, []);
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