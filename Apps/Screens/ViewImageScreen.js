import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Config/Colors';

const ViewImageScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../assets/welcome.jpg')}
      />
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" color={Colors.primary} size={30} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={Colors.primary}
          size={35}
        />
      </View>
    </View>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  deleteIcon: {
    position: 'absolute',
    top: 40,
    right: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
