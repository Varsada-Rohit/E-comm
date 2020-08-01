import React from 'react';
import {View, StyleSheet, Image, PermissionsAndroid, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Config/Colors';
import ImagePicker from 'react-native-image-picker';
import {TouchableWithoutFeedback} from 'react-native';

function ImageInput({src, onChangeImage}) {
  const requestPermission = async () => {
    let grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storgae permission required',
        message: 'Storage is required to upload picture',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if ((grant = 'granted')) {
      pickImage();
    }
  };

  const pickImage = () => {
    ImagePicker.showImagePicker(Response => {
      if (Response.didCancel) {
      } else if (Response.error) {
        console.log(Response.error);
      } else {
        onChangeImage(Response.uri);
      }
    });
  };

  const handlePress = () => {
    if (!src) {
      requestPermission();
    } else {
      Alert.alert('Delete', 'you want to delete this image', [
        {text: 'Yes', onPress: () => onChangeImage(src)},
        {text: 'No'},
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!src && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={'camera'}
            size={30}
          />
        )}
        {src && <Image style={styles.image} source={{uri: src}} width={100} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
