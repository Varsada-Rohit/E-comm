import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import * as yup from 'yup';
import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import FormSubmit from '../Components/FormSubmit';
import Auth from '../Auth/Auth';
import Colors from '../Config/Colors';
import ErrorText from '../Components/ErrorText';
import useAuth from '../Auth/useAuth';

const Schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(8),
});

function Login() {
  const {login} = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async values => {
    console.log(values);
    const result = await Auth.login(values);
    console.log(result);
    if (result.error) {
      setError(result.error);
    }
    login(result.user);
  };

  return (
    <View style={styles.container}>
      <ErrorText style={styles.error} visible={true} error={error} />
      <FormikForm
        initialValues={{email: '', password: ''}}
        validationSchema={Schema}
        onSubmit={values => handleSubmit(values)}>
        <FormInput
          feildName="email"
          name="email"
          placeholder="Email"
          keyboardType="email-address"
        />
        <FormInput feildName="password" name="key" placeholder="Password" />
        <FormSubmit title="Login" backgroundColor={Colors.primary} />
      </FormikForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  error: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default Login;
