import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import Auth from '../Auth/Auth';
import FormSubmit from '../Components/FormSubmit';
import Colors from '../Config/Colors';

const Schema = yup.object().shape({
  dname: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(8),
  confirmP: yup
    .string()
    .oneOf([yup.ref('password')], 'password must match')
    .required('please confirm password'),
});

const handleSubmit = async values => {
  const result = await Auth.register(values);
  console.log(result.error);
};

function Register() {
  return (
    <View style={styles.container}>
      <FormikForm
        initialValues={{email: '', password: '', confirmP: '', dname: ''}}
        onSubmit={values => handleSubmit(values)}
        validationSchema={Schema}>
        <FormInput feildName="dname" placeholder="Name" name="account-circle" />
        <FormInput
          feildName="email"
          name={'email'}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
        <FormInput feildName="password" name={'key'} placeholder={'Password'} />
        <FormInput
          feildName="confirmP"
          name={'key'}
          placeholder={'Confirm Password'}
        />
        <FormSubmit title={'Sign in'} backgroundColor={Colors.primary} />
      </FormikForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Register;
