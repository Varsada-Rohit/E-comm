import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppTouchableIcon({
  name,
  onPress,
  color,
  size,
  text,
  style,
  ...otherPerameters
}) {
  return (
    <TouchableHighlight
      style={[styles.constainer, style]}
      onPress={onPress}
      {...otherPerameters}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={name}
          color={color}
          size={size}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 15,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default AppTouchableIcon;
