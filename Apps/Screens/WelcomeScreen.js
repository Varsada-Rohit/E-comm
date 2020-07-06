import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

import Colors from '../Config/Colors';
import AppButton from '../Components/AppButton';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/welcome.jpg')}>
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => console.log('Clicked')}
          backgroundColor={Colors.primary}
          color={Colors.white}
        />
        <AppButton
          title="Register"
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
