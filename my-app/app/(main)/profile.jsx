import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'

const Profile = () => {
    const {user,setAuth} = useAuth();
    const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <UserHeader user={user} router={router} />
    </ScreenWrapper>
  )
}

const UserHeader = ({user, router}) => {
    return(
        <View style={{flex:1, backgroundColor:'White'}}>
            <View>
              <Header title="profile" showBackButton={true}/>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({})