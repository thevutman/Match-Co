import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const NotFoundPage = () => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push('botones');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Página No Encontrada</Text>
      <Text style={styles.message}>Lo sentimos, la página que buscas no existe.</Text>
      <Button style={styles.Button}title="Volver a la Página Principal" onPress={handleGoHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#BDDF37',
  },
  Button: {
    backgroundColor: '#BDDF37',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default NotFoundPage;