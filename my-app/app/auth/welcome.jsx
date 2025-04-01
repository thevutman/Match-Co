import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '../../helpers/common'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@/constants/theme'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const welcome = () => {
    const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image 
          style={styles.welcomeImage} 
          resizeMode='contain' 
          source={require('../../assets/images/welcome.png')} 
        />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>MatchCo</Text>
          <Text style={styles.punchline}>
            Encuentra tu partido perfecto y únete a la comunidad deportiva
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Comenzar"
            buttonStyle={{marginHorizontal: wp(3)}}
            onPress={() => router.push('/auth/signUp')}
          />
          
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
              ¿Ya tienes una cuenta?
            </Text>
            <Pressable onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginText, {color: theme.colors.primary, fontWeight: theme.fonts.semibold}]}>
                Iniciar Sesión
              </Text>
            </Pressable>
          </View>
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
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    gap: hp(2),
  },
  title: {
    color: theme.colors.primary,
    fontSize: hp(5),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
    letterSpacing: 1,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    lineHeight: hp(2.5),
  },
  footer: {
    gap: hp(3),
    width: '100%'
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(2)
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6)
  }
})