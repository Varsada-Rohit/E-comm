import React from 'react';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import Colors from '../Config/Colors';

const ListItem = ({image, title, subTitle, onPress, IconComponent}) => {
  return (
    <TouchableHighlight underlayColor={Colors.light} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image source={image} style={styles.image} />}
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.white,
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: '700',
  },
  subTitle: {
    color: Colors.medium,
  },
});
