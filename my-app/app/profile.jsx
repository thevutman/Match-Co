// import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import { useAuth } from '@/context/AuthContext'
// import { useRouter } from 'expo-router';
// import ScreenWrapper from '@/components/ScreenWrapper';
// import Header from '@/components/header';
// import { hp, wp } from '@/helpers/common';
// import Icon from '@/assets/icons';
// import { supabase } from '@/lib/supabase';
// import {Avatar} from '../components/avatar';
// // import { theme } from '@/constants/theme';

// const profile = () => {
//    const {user, setAuth} = useAuth();
//     const router = useRouter();

//      const onLogout = async ()=>{
//             setAuth(null);
//             const {error} = await supabase.auth.signOut();
//             if (error) {
//                 Alert.alert('Cerrar Sesion', 'Error al cerrar sesion')
//             }
//         }

//     const handleLogout = async () => {
//         // show confirm modal 
//         Alert.alert('Confirmar', '¿Estas seguro que quieres cerrar sesion?'[
//             {
//                 text: 'Cancelar',
//                 onPress: () => console.log('Cancel Pressed'),
//                 style: 'cancel',

//             },
//             {
//                 text: 'Cerrar sesion',
//                 onPress: () => onLogout(),
//                 style: 'destructive',
//             }
//         ])
//     }
//     return (
//     <ScreenWrapper bg="white">
//         <UserHeader user={user} router={router} handleLogout={handleLogout}/>
//     </ScreenWrapper>
//   )
// }

// const UserHeader = ({user, router, handleLogout}) => {
//     return (
//         <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4)}}>
//             <View>
//             <Header title="Profile" mb={30}/>
//             <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//                 {/* <Icon name="logout" color={theme.colors.gray} /> */}
//             </TouchableOpacity>
//             </View>

//             <View style={styles.container}>
//                 <View style= {{gap:15}}>
//                   <View style={styles.avatarContainer}>
//                     <Avatar
//                         uri={user?.image}
//                         size={hp(12)}
//                         // rounded={theme.radius.xxl*1.4}
//                     />
//                     <Pressable style={styles.editIcon} onPress= {()=> router.push('editProfile')}>
//                         <Icon name="edit" strokeWidth={2.5} size={20}/>
//                     </Pressable>
//                   </View>

//                     {/* username and adress*/ }
//                     <View style={{alignItems: 'center', gap: 4}}>
//                         <Text style={styles.userName}>{user && user.name}</Text>
//                         <Text style={styles.infoText}>{user && user.address}</Text>
//                     </View>

//                     {/* email, phone and bio */ }
//                     <View style={{gap:10}}>
//                         <View style={styles.info}>
//                             {/* <Icon name="mail" size={20} color={theme.colors.textLight} /> */}
//                             <Text style={styles.infoText}>{user && user.email}</Text>
//                         </View>
//                         {
//                             user && user.phoneNumber && (
//                                 <View style={styles.info}>
//                                     {/* <Icon name="call" size={20} color={theme.colors.textLight} /> */}
//                                     <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
//                                 </View>
//                             )
//                         }
                        
//                         {
//                             user && user.bio && (
//                                 <View style={styles.info}>
//                                     <Text style={styles.infoText}>{user.bio}</Text>
//                                 </View>
//                             )
//                         }

//                     </View>
//                 </View>
//             </View>
//         </View>
//     )

// }

// export default profile

// const styles = StyleSheet.create({
//     avatarContainer: {
//         height: hp(12),
//         width: hp(12),
//         alignSelf: 'center',
//     },
//     editIcon: {
//         position: 'absolute',
//         bottom: 0,
//         right: -12,
//         padding: 7,
//         borderRadius: 50,
//         backgroundColor: 'white',
//         // shadowColor: theme.colors.textLight,
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.4,
//         shadowRadius: 5,
//         elevation: 7,
//     },
//     userName:{
//         fontSize: hp(3),
//         fontWeight: '500',
//         // color: theme.colors.textDark,
//     },
//     info: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//     },
//     infoText: {
//         fontSize: hp(1.6),
//         fontWeight: '500',
//         // color: theme.colors.textLight,
//     }
// }) 

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View>
      <Text>profile</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})