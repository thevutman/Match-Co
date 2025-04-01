import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Icon } from '@rneui/themed';
import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      name: 'Inicio',
      icon: 'location-on',
      path: '/screens/MapScreen',
    },
    {
      name: 'Mis Torneos',
      icon: 'sports-soccer',
      path: '/mis-torneos',
    },
    {
      name: 'Perfil',
      icon: 'person',
      path: '/screens/profile',
    },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.path}
            style={styles.tab}
            onPress={() => router.push(route.path)}
          >
            <Icon
              name={route.icon}
              type="material"
              size={24}
              color={isActive(route.path) ? theme.colors.primary : theme.colors.textLight}
            />
            <Text
              style={[
                styles.tabText,
                isActive(route.path) && styles.activeTabText,
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(1),
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: Platform.OS === 'ios' ? hp(6) : hp(4)
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(1),
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  tabText: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    marginTop: hp(0.5),
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: hp(4),
  },
  appName: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: hp(2),
    color: theme.colors.textLight,
    marginTop: hp(1),
  },
});

export default NavBar;