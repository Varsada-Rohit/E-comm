import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import Colors from '../Config/Colors';
import ListItem from '../Components/ListItem';
import AppImageSwiper from '../Components/AppImageSwiper';
import firestore from '@react-native-firebase/firestore';
import AppButton from '../Components/AppButton';
import {Rating, AirbnbRating} from 'react-native-ratings';

function ListingDetailsScreen({route}) {
  const {item} = route.params;
  const title = item.Title;
  const price = item.Price;
  const [data, setData] = useState([]);

  useEffect(() => {
    getimages(item.key);
    console.log(data);
  }, []);

  getimages = async id => {
    console.log(id);
    let sources = [];
    await firestore()
      .collection('Products')
      .doc(id)
      .get()
      .then(snapshot => {
        console.log(snapshot.data().images);

        let images = snapshot.data().images;
        if (images.length > 1) {
          for (let i = 1; i < images.length; i++) {
            let source = {uri: images[i]};
            sources.push(source);
          }
        }
        sources.push(item.image);
        setData(sources);
      });
  };

  return (
    <View style={{backgroundColor: Colors.white}}>
      <View style={styles.button}>
        <AppButton
          style={styles.addToCart}
          title="Add to Cart"
          color={Colors.white}
          backgroundColor={Colors.secondary}
        />
        <AppButton
          style={styles.buyNow}
          title="Buy now"
          color={Colors.white}
          backgroundColor={Colors.primary}
        />
      </View>
      <ScrollView style={styles.detailContainer}>
        <AppImageSwiper
          // dotStyle={{backgroundColor: 'red', top: 20}}
          data={data}
          swiperStyle={styles.image}
          height={250}
          loop={false}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₹{price}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Rating : </Text>
          <Rating
            imageSize={30}
            style={styles.ratingCount}
            type={'custom'}
            ratingCount={5}
            fractions={1}
            startingValue={3.5}
            readonly
          />
        </View>

        <View style={styles.userContainer}>
          <Text>Description : This is the breif description of product </Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  addToCart: {
    width: 150,
    marginVertical: 3,
  },
  buyNow: {
    width: 150,
    marginVertical: 3,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'auto',
    justifyContent: 'space-around',
    zIndex: 1,
    backgroundColor: Colors.white,
  },
  detailContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    padding: 5,
    borderBottomWidth: 1,
    marginVertical: 0,
    borderColor: Colors.medium,
  },
  price: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
    color: Colors.secondary,
  },
  rating: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  ratingCount: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 50,
  },
});
