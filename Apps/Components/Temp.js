import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import * as yup from 'yup';

import FormikForm from './FormikForm';
import FormInput from './FormInput';

function Temp() {
  let Schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <View style={styles.container}>
      <Picker
        mode={'dropdown'}
        // selectedValue={selectedValue}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Temp;
