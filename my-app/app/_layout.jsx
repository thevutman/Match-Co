import React, { useEffect } from 'react'
import { Stack, useRouter, usePathname } from 'expo-router'
import { View } from 'react-native'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { getUserData} from '../services/userService'
import { MessageProvider } from '@/contexts/MessageContext'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavBar from '@/components/NavBar'

const _layout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MessageProvider>
          <MainLayout />
        </MessageProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}

const MainLayout = () => {
  const {setAuth, setUserData, user} = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Rutas donde no queremos mostrar el NavBar
  const hideNavBarRoutes = [
    '/screens/welcome',
    '/screens/login',
    '/screens/register',
  ];

  // Mostramos el NavBar solo si hay usuario autenticado y no estamos en rutas de auth
  const shouldShowNavBar = user && !hideNavBarRoutes.includes(pathname);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if(session){
        setAuth(session?.user);
        updateUserData(session?.user, session?.user.email);
        router.replace('/screens/MapScreen');
      }
      else{
        setAuth(null);
        router.replace('/auth/welcome');
      }
    })
  }, []);
  
  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    console.log('got user data: ', res)

    if (res.success) setUserData({...res.data, email});
  }
  
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
      {shouldShowNavBar && <NavBar />}
    </View>
  )
}

export default _layout