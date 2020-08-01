import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper';
function AppImageSwiper({
  data,
  height,
  swiperStyle,
  viewStyle,
  ...otherPerameters
}) {
  return (
    <View style={[styles.container, swiperStyle, {height: height}]}>
      <Swiper {...otherPerameters} key={data.length}>
        {data.map((img, index) => {
          return (
            <View key={index}>
              <Image
                style={[styles.view, {height: height}, viewStyle]}
                source={img}
                resizeMode={'contain'}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginVertical: 10,
  },
  view: {
    width: '100%',
  },
});

export default AppImageSwiper;
