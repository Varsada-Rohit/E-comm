import React from 'react';
import {StyleSheet} from 'react-native';
import AppTextInput from './AppTextInput';
import ErrorText from './ErrorText';
import {useFormikContext} from 'formik';

function FormInput({feildName, ...otherPerameters}) {
  const {
    setFieldTouched,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormikContext();
  return (
    <>
      <AppTextInput
        onChangeText={input => setFieldValue(feildName, input)}
        value={values.name}
        onBlur={() => {
          setFieldTouched(feildName);
        }}
        {...otherPerameters}
      />
      <ErrorText visible={touched[feildName]} error={errors[feildName]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormInput;
