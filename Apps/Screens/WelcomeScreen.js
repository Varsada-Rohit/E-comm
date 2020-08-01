import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

import Colors from '../Config/Colors';
import AppButton from '../Components/AppButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/welcome.jpg')}>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate('login')}
          backgroundColor={Colors.primary}
          color={Colors.white}
        />
        <AppButton
          title="Register"
          onPress={() => navigation.navigate('register')}
          backgroundColor={Colors.secondary}
          color={Colors.white}
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonContainer: {
    padding: 20,
  },
});
