import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppTextInput({name, ...otherPerameters}) {
  return (
    <View style={styles.container}>
      {name && (
        <MaterialCommunityIcons style={styles.icon} name={name} size={25} />
      )}
      <TextInput style={styles.textInput} {...otherPerameters} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ececec',
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 5,
    color: 'tomato',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});

export default AppTextInput;
