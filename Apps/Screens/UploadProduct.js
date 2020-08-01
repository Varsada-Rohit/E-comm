import React, {useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Picker} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as yup from 'yup';

import AppLoading from '../Components/AppLoading';
import Colors from '../Config/Colors';
import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';

import FormSubmit from '../Components/FormSubmit';
import FormDropdown from '../Components/FormDropdown';
import FormInputImage from '../Components/FormInputImage';

const category = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
  {
    label: 'D',
    value: 'D',
  },
];

function UploadProduct() {
  const [loading, setLoading] = useState(false);

  let Schema = yup.object().shape({
    title: yup.string().required(),
    subTitle: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    images: yup
      .array()
      .min(1)
      .required(),
  });

  const onSubmitbtn = async ({title, subTitle, category, price, images}) => {
    setLoading(true);
    try {
      let refs = firestore().collection('Products');
      let key = await refs.add({
        Title: title,
        Subtitle: subTitle,
        Category: category,
        Price: price,
        images: [],
      });
      console.log('key', key.id);
      if (images.length > 0) {
        let ref = storage().ref('ProductImages/' + key.id);
        for (let i = 0; i < images.length; i++) {
          await ref.child('image' + i).putFile(images[i]);
          let url = await ref.child('image' + i).getDownloadURL();
          await refs.doc(key.id).update({
            images: firestore.FieldValue.arrayUnion(url),
          });
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.constainer}>
      <FormikForm
        onSubmit={values => {
          onSubmitbtn(values);
        }}
        initialValues={{
          title: '',
          subTitle: '',
          price: '',
          category: 'A',
          images: [],
        }}
        validationSchema={Schema}>
        <FormInputImage name="images" />
        <FormInput
          name="format-title"
          placeholder="Product title"
          feildName={'title'}
        />
        <FormInput
          name="subtitles"
          placeholder="Product subtitle"
          feildName={'subTitle'}
        />
        <FormInput
          name="currency-inr"
          placeholder="Price"
          feildName="price"
          keyboardType="numeric"
        />

        <FormDropdown data={category} />
        <FormSubmit
          title={'submit'}
          color="white"
          backgroundColor="dodgerblue"
        />
      </FormikForm>

      <AppLoading
        size={'large'}
        text={'Uploading...'}
        color={Colors.primary}
        animating={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: '90%',
    alignSelf: 'center',
  },
  imageWiper: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    padding: 10,
  },
  uploadIcon: {
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#5DE898',
  },
});

export default UploadProduct;
