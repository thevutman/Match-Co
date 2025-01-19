import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Header from '@/components/header';
import { Image } from 'expo-image'
import { useAuth } from '@/context/AuthContext'
import { getUserImageSrc, uploadFile } from '@/services/imageService'
import Icon from '@/assets/icons'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { router, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const EditProfile = () => {
    const {user: currentUser, setUserdata} = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const {user, setUser} = useState({
        name: '',
        phoneNumber: '',
        image: '',
        bio: '',
        adress: '',
    })
  
    useEffect(() => {
        if(currentUser){
            setUser({
                name: currentUser.name || '',
                phoneNumber: currentUser.phoneNumber || '',
                image: currentUser.image || null,
                bio: currentUser.bio || '',
                adress: currentUser.adress || '',
            })
        }
    }, [currentUser])

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if(!result.canceled) {
            setUser({...user, image: result.assets[0]});
        }
    }

    const onSubmit = async () => {
        let userData = {...user};
        let {name, phoneNumber, adress, image, bio} = userData;
        if (!name || !phoneNumber || !adress || !bio || !image) {
            Alert.alert('Perfil', "Por favor, completa todos los campos")
            return;
        }
        setLoading(true);

        if (typeof image == 'object') {
            //upload image
            let imageRes = await uploadFile('profiles', image?.uri, true)
            if (imageRes.success) userData.image = imageRes.data;
            else userData.image = null;
        }
        //Update user
        const res = await updateUser(currentUser?.id, userData);
        setLoading(false);

        if(res.success){
            setUserdata({...currentUser, ...userData});
            router.back();
        }
    }

    let imageSource = user.image && typeof user.image == 'object'? user.image.uri : getUserImageSrc(user.image);
    return (
    <ScreenWrapper bg="white">
      <View style = {styles.container}>
        <ScrollView style= {{flex:1}}>
            <Header title="Editar el Perfil" />

            {/* Form */}
            <View style={styles.form}>
                <View style={styles.avatarContainer}>
                    <Image source={imageSource} style={styles.avatar}/>
                    <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                        <Icon name="camera" size={20} strokeWidth={2.5}/>
                    </Pressable>
                </View>
                <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                    Porfavor llena los campos de tu perfil
                </Text>
                <Input
                 icon={<Icon name="user"/>}
                 placeholder='Ingresa tu nombre'
                 value={user.name}
                 onChangeText={value=> setUser({...user, name: value})}
                />
                <Input
                 icon={<Icon name="call"/>}
                 placeholder='Ingresa tu numero telefonico'
                 value={user.phoneNumber}
                 onChangeText={value=> setUser({...user, phoneNumber: value})}
                />
                <Input
                 icon={<Icon name="location"/>}
                 placeholder='Ingresa tu direccion'
                 value={user.adress}
                 onChangeText={value=> setUser({...user, adress: value})}
                />
                <Input
                 placeholder='Ingresa tu biografia'
                 value={user.bio}
                 multiline={true}
                 containerStyle={styles.bio}
                 onChangeText={value=> setUser({...user, bio: value})}
                />
                <Button title='Update' loading={loading} onPress={onSubmit} />
            </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4)
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
        borderCurve: 'continuous'
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
        gap: 10,
        marginTop: 20,
    },
    bio: {
        flexDirection: 'row',
        height: hp(15),
        alignItems: 'flex-start',
        paddingVertical: 15,
    }
})