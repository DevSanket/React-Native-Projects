import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

export default function App() {
  const SignIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: ['profile'], // what API you want to access on behalf of the user, default is email and profile
        webClientId:
          '237596332632-i2218u9tlh2kq6jeiir3pa2r77udmgna.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Button title="Login" onPress={SignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
