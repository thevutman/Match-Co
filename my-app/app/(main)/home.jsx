// import { View, Text, Button, Alert } from 'react-native';
// import React from 'react';
// import { supabase } from '../../lib/supabase';
// import { useAuth } from '../../contexts/AuthContext';
// import { Avatar } from '../../components/avatar';


// const home = () => {
//     const {setAuth} = useAuth();

//    // const onLogout = async ()=>{
//      //   setAuth(null);
//      //   const {error} = await supabase.auth.signOut();
//      //   if (error) {
//      //       Alert.alert('Cerrar Sesion', 'Error al cerrar sesion')
//      //   }
//    // }
//   return (
//     <View>
//       <Text>home</Text>
//      {/*<Button title="logout"onPress={onLogout}></Button>*/}
//       <Avatar
//         uri={user?.image}
//         size={50}
//         rounded={36}
//         style={{}}
//       />
//     </View>
//   )
// }

// export default home

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})