import { Alert, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'expo-router'
import { Icon } from '@rneui/themed'
import { hp, wp } from '../../helpers/common'
import { theme } from '@/constants/theme'
import { supabase } from '../../lib/supabase'
import Header from '../../components/header'
import Avatar from '@/components/avatar'

const Profile = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();

    const onLogout = async () => {
        try {
            setAuth(null);
            const { error } = await supabase.auth.signOut();
            if (error) {
                Alert.alert('Error', "Error al cerrar sesión. Por favor, intenta de nuevo.");
            } else {
                router.replace('/auth/welcome');
            }
        } catch (error) {
            Alert.alert('Error', "Error inesperado al cerrar sesión.");
        }
    }

    const handleLogout = () => {
        Alert.alert(
            'Confirmar', 
            "¿Estás seguro que deseas cerrar sesión?",
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Cerrar Sesión',
                    onPress: onLogout,
                    style: 'destructive'
                }
            ]
        );
    }

    if (!user) {
        return (
            <ScreenWrapper bg="white">
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error al cargar el perfil</Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper bg="white">
            <UserHeader user={user} router={router} handleLogout={handleLogout} />
        </ScreenWrapper>
    );
}

const UserHeader = ({ user, router, handleLogout }) => {
    return (
        <View style={styles.container}>
            <View>
                <Header title="Perfil" mb={30}/>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" color={theme.colors.rose}/>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user.image}
                            size={hp(12)}
                            rounded={theme.radius.xxl * 1.4}
                        />
                        <Pressable 
                            style={styles.editIcon} 
                            onPress={() => router.push('/screens/editProfile')}
                        >
                            <Icon name="edit" size={20}/>
                        </Pressable>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        {user.address && <Text style={styles.infoText}>{user.address}</Text>}
                    </View>
                </View>

                <View style={styles.detailsSection}>
                    <View style={styles.infoRow}>
                        <Icon name="mail" size={20} color={theme.colors.textLight}/>
                        <Text style={styles.infoText}>{user.email}</Text>
                    </View>
                    {user.phone_number && (
                        <View style={styles.infoRow}>
                            <Icon name="call" size={20} color={theme.colors.textLight}/>
                            <Text style={styles.infoText}>{user.phone_number}</Text>
                        </View>
                    )}
                    {user.bio && (
                        <View style={styles.bioContainer}>
                            <Text style={styles.infoText}>{user.bio}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    contentContainer: {
        gap: 15
    },
    avatarSection: {
        alignItems: 'center',
        gap: 15
    },
    avatarContainer: {
        height: hp(12),
        width: hp(12),
        alignSelf: 'center'
    },
    userInfo: {
        alignItems: 'center',
        gap: 4
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },
    userName: {
        fontSize: hp(3),
        fontWeight: '500',
        color: theme.colors.textDark
    },
    detailsSection: {
        gap: 10
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bioContainer: {
        marginTop: 5
    },
    infoText: {
        fontSize: hp(1.6),
        fontWeight: '500',
        color: theme.colors.textLight
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: hp(2),
        color: theme.colors.error
    }
});