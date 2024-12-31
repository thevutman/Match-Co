import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavBar = () => {
  const router = useRouter();

  return (
    <View style={{ backgroundColor: '#fff', padding: 50 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => {router.push('Profile')}}>
          <Icon name="person" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('Home')}}>
          <Icon name="location-on" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('Chat')}}>
          <Icon name="chat" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;