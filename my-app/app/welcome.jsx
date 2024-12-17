// import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ScreenWrapper from '@/components/ScreenWrapper'
// import { hp, wp } from '../helpers/common'
// import { StatusBar } from 'expo-status-bar'
// import { theme } from '@/constants/theme'
// import Button from '@/components/Button'
// import { useRouter } from 'expo-router'

// const welcome = () => {
//     const router = useRouter();
//   return (
//     <ScreenWrapper bg="white">
//       <StatusBar style = "dark" />
//       <View style = {styles.container}>
//         {/*welcome image*/}
//         <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />

//          {/*tittle*/} 
//          <View style={{gap:20}}>
//             <Text style= {styles.tittle}>LinkUp !</Text>
//             <Text style= {styles.punchline}>
//                 where every thought finds a home and every image tells a story
//             </Text>
//          </View>

//          {/* footer */}
//          <View style={styles.footer}>
//             <Button
//                 title="Getting Started"
//                 buttonStyle={{marginHorizontal: wp(3)}}
//                 onPress={()=> router.push('signUp')}
//             />
            
//             <View style={styles.bottomTextContainer}>
//               <Text style={[styles.loginText]}>
//                   Already have an account!
//               </Text>
//                   <Pressable onPress={()=> router.push('login')}>
//                     <Text style={[styles.loginText,{color:theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
//                       Login
//                     </Text>
//                  </Pressable>
//             </View>
//          </View>
//       </View>

//     </ScreenWrapper>
//   )
// }

// export default welcome

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: 'white',
//     paddingHorizontal: wp(4)

//   },
//   welcomeImage:{
//     height: hp(30),
//     width: wp(100),
//     alignSelf: 'center',

//   },
//   tittle:{
//       color: theme.colors.text,
//       fontSize: hp(4),
//       textAlign: 'center',
//       fontWeight: theme.fonts.extraBold


//   },
//   punchline:{
//       textAlign:'center',
//       paddingHorizontal:wp(10),
//       fontSize:hp(1.7),
//       color:theme.colors.text
//   },
//   footer: {
//     gap: 30,
//     width: '100%'
//   },

//   bottomTextContainer:{
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//     gap:5
//   },
//   loginText: {
//     textAlign: 'center',
//     color: theme.colors.text,
//     fontSize: hp(1.6)
//   }
// })