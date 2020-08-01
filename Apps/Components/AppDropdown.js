import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

function AppDropdown({data, ...otherPerameters}) {
  return (
    <View style={styles.container}>
      <Picker style={styles.dropdown} {...otherPerameters}>
        {data.map((obj, index) => {
          return (
            <Picker.Item label={obj.label} value={obj.value} key={index} />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ececec',
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: 'center',
  },
  dropdown: {
    fontWeight: '900',
    marginHorizontal: 10,
  },
});

export default AppDropdown;
