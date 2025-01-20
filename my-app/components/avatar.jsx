import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import {getUserImageSrc} from '../services/imageService';
import { theme } from '@/constants/theme';

const avatar = ({
    uri, 
    size= 40,
    rounded=14,
    style={}


}) => {
  return (
   <Image
   source={getUserImageSrc(uri)}
   transition={100}
   style= {[Styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
   />  
 )
}

export default avatar

const styles = StyleSheet.create({avatar:{
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
}})