import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '../helpers/common'
import { StatusBar } from 'expo-status-bar'

const welcome = () => {
  return (
    <ScreenWrapper bg="white">
      <StatusBar style = "dark" />
      <View style = {styles.container}>
        {/*welcome image*/}
        <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />

         {/*tittle*/} 
         <View style={{gap:20}}>
            <Text style= {styles.tittle}>LinkUp !</Text>
            <Text style= {styles.punchline}>
                where every thought finds a home and every image tells a story
            </Text>
         </View>
      </View>

    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: wp(4)

  },
  welcomeImage:{
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',

  }
})