import React, {useState} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';

import AppDropdown from '../Components/AppDropdown';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import AppImageSwiper from '../Components/AppImageSwiper';
import AppTouchableIcon from '../Components/AppTouchableIcon';
import AppLoading from '../Components/AppLoading';
import Colors from '../Config/Colors';

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
  const [images, setimages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [subTitle, setsubTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedvalue, setselectedvalue] = useState(category[1].label);
  const [loading, setLoading] = useState(false);

  const showImagePicker = () => {
    ImagePicker.showImagePicker(Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
        console.log(Response.error);
      } else {
        setimages(images.concat({uri: Response.uri}));
      }
    });
  };

  onUploadBtn = async () => {
    let permissionCamera = await PermissionsAndroid.check(
      'android.permission.CAMERA',
    );
    let permissionStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    console.log('cam', permissionCamera);
    console.log('stor', permissionStorage);

    if (permissionCamera && permissionStorage) {
      showImagePicker();
    } else if (permissionCamera) {
      let grant = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storgae permission required',
          message: 'Storage is required to upload picture',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grant == PermissionsAndroid.RESULTS.GRANTED) {
        showImagePicker();
      }
    } else if (permissionStorage) {
      let grant = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera permission required',
          message: 'camera is required to upload picture',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (grant == PermissionsAndroid.RESULTS.GRANTED) {
        showImagePicker();
      }
    } else {
      await PermissionsAndroid.requestMultiple([
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
      ]).then(status => {
        console.log(status);
        if (
          status['android.permission.CAMERA'] == 'granted' &&
          status['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted'
        ) {
          showImagePicker();
        }
      });
    }
  };
  onSubmitbtn = async () => {
    setLoading(true);
    console.log(images.length);
    try {
      let refs = firestore().collection('Products');
      let key = await refs.add({
        Title: title,
        Subtitle: subTitle,
        Category: selectedvalue,
        Price: price,
        images: [],
      });
      console.log(key.id);
      if (images.length > 0) {
        let ref = storage().ref('ProductImages/' + key.id);
        for (let i = 0; i < images.length; i++) {
          await ref.child('image' + i).putFile(images[i].uri);
          let url = await ref.child('image' + i).getDownloadURL();
          await refs.doc(key.id).update({
            images: firestore.FieldValue.arrayUnion(url),
          });
        }

        console.log(images[0].uri);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.constainer}>
      <AppImageSwiper
        swiperStyle={styles.imageWiper}
        data={images}
        height={200}
        showsButtons={true}
        loop={false}
        onIndexChanged={index => {
          alert('yup');
        }}
      />
      <AppTouchableIcon
        disabled={images.length < 3 ? false : true}
        style={styles.uploadIcon}
        name="upload"
        color="tomato"
        size={30}
        text="Upload"
        onPress={onUploadBtn}
      />
      <AppTextInput
        name="format-title"
        placeholder="Product title"
        onChangeText={value => {
          setTitle(value);
        }}
      />
      <AppTextInput
        name="subtitles"
        placeholder="Product subtitle"
        onChangeText={value => {
          setsubTitle(value);
        }}
      />
      <AppTextInput
        name="currency-inr"
        placeholder="Price"
        onChangeText={value => {
          setPrice(value);
        }}
      />
      <AppDropdown
        data={category}
        selectedValue={selectedvalue}
        onValueChange={(itemValue, itemIndex) => {
          setselectedvalue(itemValue);
        }}
      />
      <AppButton
        title={'submit'}
        color="white"
        backgroundColor="dodgerblue"
        onPress={onSubmitbtn}
      />
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
