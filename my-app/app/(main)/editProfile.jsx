// import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ScreenWrapper from '../../components/ScreenWrapper'
// import { hp, wp } from '../../helpers/common'
// import { theme } from '../../constants/theme'
// import Header from '../../components/header'
// import { Image } from 'expo-image'
// import Icon from '@/assets/icons'
// import { useAuth } from '@/context/AuthContext'
// import { getUserImageSrc } from '@/services/userService'


// const EditProfile = () => {
   
//     const {user} = useAuth();

//     let imageSource = getUserImageSrc(user.image);
//     <ScreenWrapper backgroundColor="white">
//         <View style={styles.container}>
//             <ScrollView style={{flex: 1}}>
//                 <Header title="Edit profile"/>
                
//                 <View style={styles.form}>
//                     <View style={styles.avatarContainer}>
//                         <Image source={imageSource} style={styles.avatar} />
//                         <Pressable> 
//                             <Icon name="camera" size={20} strokeWidth={2.5} />
//                         </Pressable>
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     </ScreenWrapper>
// }

// export default EditProfile

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, 
//         paddingHorizontal: wp(4),

//     },
//     avatarContainer: {
//         height: hp(14),
//         width: hp(14),
//         alignSelf: 'center',
//     },
//     avatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: theme.radius.xxl*1.8,
//         borderCurve: 'continuous',
//         borderWidth: 1,
//         borderColor: theme.colors.darkLight,
//     },
//     cameraIcon: {
//         position: 'absolute',
//         bottom: 0,
//         right: -10,
//         padding: 8,
//         borderRadius: 50,
//         backgroundColor: 'white',
//         shadowColor: theme.colors.textLight,
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.4,
//         shadowRadius: 5,
//         elevation: 7
//     },
//     form: {
//         gap: 18,
//         marginTop: 20,
//     },
//     input: {
//         flexDirection: 'row',
//         borderWidth: 0.4
//     }
// })

 import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
 import React, { useEffect, useState } from 'react'
 import ScreenWrapper from '../../components/ScreenWrapper'
 import { hp, wp } from '../../helpers/common'
 import { theme } from '../../constants/theme'
 import Header from '../../components/header'
 import { Image } from 'expo-image'
 import Icon from '@/assets/icons'
 import { useAuth } from '@/context/AuthContext'
 import { getUserImageSrc, updateUser, uploadFile } from '@/services/userService'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { router, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const editProfile = () => {
    const {user: currentUser, setUserData} = useAuth();
    const [loading, setLoading] = useState(false);

    const router = useRouter

    const [user, setUser] = useState ({
        name: '',
        phoneNumber: '',
        image: null,
        bio: '',
        address: '',
    });

    useEffect(()=>{
        if (currentUser){
            setUser({
                name: currentUser.name || '',
                phoneNumber: currentUser.phoneNumber || '',
                image: currentUser.image || null,
                bio: currentUser.bio || '',
                address: currentUser.address || '',
            });
        }
    }, [currentUser])

    let imageSource = user.image && typeof user.image == 'object'? user.image.uri: getUserImageSrc(user.image);

    const onPickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setUser({...user, image: result.assets[0]});
        }
    }

    const onsubmit = async ()=>{
        let userData = {...user};
        let {name, image, bio, address, phoneNumber} = userData;
        if (!name || !phoneNumber || !bio || !address || !phoneNumber || !image){
            Alert.alert('Perfil', "Por favor llenar todos los campos");
            return; 
        }
        setLoading(true);
        
        if (typeof image == 'object'){
            //Upload Image
            let imageRes = await uploadFile('profiles', image?.uri, true);
            if(imageRes.success){
                userData.image = imageRes.data;
            }
            else {
                userData.image = null;
            }
        }
        const res = await updateUser(currentUser?.id, userData);
        setLoading(false);

        if(res.success){
            setUserData({...currentUser, ...userData});
            router.back();
        }
    }
    return (
    <ScreenWrapper backgroundColor="white">
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <Header title="Edit profile"/>
                
                <View style={styles.form}>
                    <View style={styles.avatarContainer}>
                    <Image source={imageSource} style={styles.avatar} /> 
                        <Pressable styles={styles.cameraIcon} onPress={onPickImage}>
                            <Icon name="camera" size={20} strokeWidth={2.5} />
                        </Pressable>
                    </View>
                    <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                        Porfavor llenar sus datos del perfil
                    </Text>
                    <Input
                        icon={<Icon name="user"/>}
                        placeholder='Ingresa tu Nombre'
                        value={user.name}
                        onChangeText={value=> setUser({...user, name:value})}
                    />
                    <Input
                        icon={<Icon name="call"/>}
                        placeholder='Ingresa tu Numero Telefonico'
                        value={user.phoneNumber}
                        onChangeText={value=> setUser({...user, phoneNumber:value})}
                    />
                    <Input
                        icon={<Icon name="location"/>}
                        placeholder='Ingresa tu direccion'
                        value={user.address}
                        onChangeText={value=> setUser({...user, address:value})}
                    />
                    <Input
                        placeholder='Ingresa tu Bio'
                        value={user.bio}
                        multiline={true}
                        containerStyle={styles.bio}
                        onChangeText={value=> setUser({...user, bio:value})}
                    />

                    <Button title='Actualizar Informacion' loading={loading} onPress={onsubmit} />
                </View>
            </ScrollView>
        </View>
    </ScreenWrapper>
  )
}

export default editProfile

const styles = StyleSheet.create({
    container: {
         flex: 1, 
         paddingHorizontal: wp(4),

    },
     avatarContainer: {
         height: hp(14),
         width: hp(14),
         alignSelf: 'center',
    },
    avatar: {
         width: '100%',
         height: '100%',
         borderRadius: theme.radius.xxl*1.8,
         borderCurve: 'continuous',
         borderWidth: 1,
         borderColor: theme.colors.darkLight,
    },
    cameraIcon: {
         position: 'absolute',
         bottom: 0,
         right: -10,
         padding: 8,
         borderRadius: 50,
         backgroundColor: 'white',
         shadowColor: theme.colors.textLight,
         shadowOffset: { width: 0, height: 4 },
         shadowOpacity: 0.4,
         shadowRadius: 5,
         elevation: 7
    },
     form: {
         gap: 18,
         marginTop: 20,
    },
    input: {
         flexDirection: 'row',
         borderWidth: 0.4,
         borderColor: theme.colors.text,
         borderRadius: theme.radius.xxl,
         borderCurve: 'continuous',
         padding: 17,
         paddingHorizontal: 20,
         gap: 15,
    },
    bio: {
        flexDirection: 'row',
        height: hp(15),
        alignItems: 'flex-start',
        paddingVertical: 15,
    }
})