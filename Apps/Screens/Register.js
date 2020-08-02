import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import * as yup from 'yup';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import Auth from '../Auth/Auth';
import FormSubmit from '../Components/FormSubmit';
import Colors from '../Config/Colors';
import useAuth from '../Auth/useAuth';
import ErrorText from '../Components/ErrorText';
import Loading from '../Components/Loading';

const Schema = yup.object().shape({
  dname: yup
    .string()
    .required()
    .label('Name'),
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

function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();
  const handleSubmit = async values => {
    setLoading(true);
    const result = await Auth.register(values);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    register(result.user);
  };

  return (
    <>
      <View style={styles.container}>
        <ErrorText style={styles.error} visible={true} error={error} />
        <FormikForm
          initialValues={{dname: '', email: '', password: '', confirmP: ''}}
          onSubmit={values => handleSubmit(values)}
          validationSchema={Schema}>
          <FormInput
            feildName="dname"
            placeholder="Name"
            name="account-circle"
          />
          <FormInput
            feildName="email"
            name={'email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
          />
          <FormInput
            feildName="password"
            name={'key'}
            placeholder={'Password'}
          />
          <FormInput
            feildName="confirmP"
            name={'key'}
            placeholder={'Confirm Password'}
          />
          <FormSubmit
            style={styles.submit}
            title={'Sign in'}
            color={Colors.white}
            backgroundColor={Colors.primary}
          />
        </FormikForm>
      </View>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  error: {
    alignSelf: 'center',
    fontSize: 18,
  },
  submit: {
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default Register;
