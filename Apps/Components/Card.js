import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../Config/Colors';

const Card = ({title, subTitle, image}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode={'contain'} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
  },
  detailContainer: {
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.secondary,
  },
});
