import { } from 'react-native';
import { Stack } from 'expo-router';
import {React, useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { getUserData } from '../services/userService'

const _layout = () => {
  return (
   <AuthProvider>
     <MainLayout></MainLayout>
   </AuthProvider>
  )
}
const MainLayout = ()=>{
    const {setAuth, setUserData} = useAuth();
    const router = useRouter();
    useEffect (()=> {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('session user: ', session?.user?.id);

            if (session) {
                setAuth(session?.user);
                updateUserData(session?.user);
                router.replace('/home');
            }else{
                setAuth(null);
                router.replace('/index');
            }

        })
    }, [])

    const updateUserData = async (user) => {
        let res = await getUserData(user?.id);
        if (res.success) setUserData(res.data);
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