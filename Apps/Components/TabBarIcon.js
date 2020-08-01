import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../Config/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function TabBarIcon({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={'plus-circle'}
          size={30}
          color={'white'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    bottom: 18,
    borderWidth: 7,
    borderColor: Colors.white,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBarIcon;
