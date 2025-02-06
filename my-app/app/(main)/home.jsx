import { Alert,Button, StyleSheet,Text, View,Pressable } from "react-native"
import React from 'react';
import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import {header} from "@/components/header";
import { theme } from "@/constants/theme";
import Icon from "../../assets/icons";
import { wp, hp } from "@/helpers/common";
import { useRoute } from "@react-navigation/native";
import  Avatar  from "@rneui/themed";


const Home = () => {

  const{user, setAuth} = useAuth();
  const router = useRoute();

  console.log('user: ', user);

  // const onLogout = async ()=>{
  //   // setAuth(null);
  //   const {error} = await supabase.auth.signOut();
  //   if(error){
  //     Alert.alert('Sign out', "Error signing out!")
  //   }
  // }

  return(
    <ScreenWrapper bg="White">
      <View style={styles.container}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.title}>LinkUp</Text>
            <View style={styles.icons}>
              <Pressable onPress={()=> router.push('notifcations')}>
                <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
              </Pressable>
              <Pressable  onPress={()=> router.push('newPost')}>
                <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
              </Pressable>
              <Pressable  onPress={()=> router.push('profile')}>
                {/* <Avatar
                  uri={user?.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{borderWidth:2}}
                /> */}
              </Pressable>
            </View>
          </View>
      </View>
      
      {/* <Button title="logout" onPress={onLogout}/> */}
    </ScreenWrapper>
  )

}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    // paddingHorizontal: wp(4)
  },

  header:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4)
  },
  title:{
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold
  },
  avatarImage:{
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    bordercurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3
  },

})