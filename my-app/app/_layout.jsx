import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { getUserData} from '../services/userService'
import { MessageProvider } from '@/contexts/MessageContext'
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
  const {setAuth, setUserData} = useAuth();
 const router =useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if(session){
        setAuth(session?.user);
        updateUserData(session?.user, session?.user.email);
        router.replace('/screens/MapScreen');
        // router.replace('/profile');
        // router.replace('/chat/12345');
      }
      else{
        setAuth(null);
        router.replace('/welcome');
      }
    })
  }, []);
  
  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    console.log('got user data: ', res)

    if (res.success) setUserData({...res.data, email});
  }
  
  return (
    <Stack
        screenOptions={{
            headerShown: false
        }}
    />
  )
}

export default _layout