import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyles]}>
      {
        props.icon && props.icon
      }  
      <TextInput
        style={{flex:1}}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
        />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: 'continous',
        paddingHorizontal: 18,
        gap:12
    
    }
})