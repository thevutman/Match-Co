import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const index = () => {
  const router = useRouter()
  return (
    <View>
      <Text>indexx</Text>
      <Button title="ir"  onPress={()=> router.push('Auth')}/>
    </View>
  )
}

export default index