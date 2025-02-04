import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton'
import { hp } from '@/helpers/common'
import { theme } from '@/constants/theme'

const header = ({title,showBackButton = true, mb=10}) => {
// const header = () => {
    const router = useRouter();
  return (
    <View style={[styles.container, {marginBottom: mb}]}>
        {
            showBackButton && (
                <View style={styles.showBackButton}>
                    <BackButton router={router}/>
                </View>
            )
        }
        <Text style={styles.title}>{title || ""}</Text>

    </View>
      
  )
}

export default header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: 5,
         gap: 10, 
    },
    title: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.textDark

    },
    BackButton: {
        position: 'absolute',
        left: 0
    }
})