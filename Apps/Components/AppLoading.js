import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Colors from '../Config/Colors';

function AppLoading({size, style, text, color, animating}) {
  if (animating) {
    return (
      <View style={styles.container} blurRadius={10}>
        <View style={[styles.view, style]}>
          <ActivityIndicator size={size} color={color} animating={animating} />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  view: {
    backgroundColor: '#afe9e5',
    borderRadius: 10,
    padding: 5,
  },
});

export default AppLoading;
