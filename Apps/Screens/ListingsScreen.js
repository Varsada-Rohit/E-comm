import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Card from '../Components/Card';
import Colors from '../Config/Colors';
import AppTouchableIcon from '../Components/AppTouchableIcon';

function ListingsScreen({navigation}) {
  const [products, setproducts] = useState([]);

  const ref = firestore().collection('Products');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let allProducts = [];
    await ref
      .limit(4)
      .get()
      .then(snapshot => {
        snapshot.forEach(product => {
          let obj = {
            key: product.id,
            Title: product.data().Title,
            Price: product.data().Price,
            image: {uri: product.data().images[0]},
          };
          allProducts.push(obj);
          global.lastDoc = product;
        });
        setproducts(products.concat(allProducts));
      });
  };

  onLoadMore = async () => {
    console.log(global.lastDoc);
    let allProducts = [];
    const moreproducts = await ref
      .startAfter(lastDoc)
      .limit(4)
      .get()
      .then(snapshot => {
        snapshot.forEach(product => {
          let obj = {
            key: product.id,
            Title: product.data().Title,
            Price: product.data().Price,
            image: {uri: product.data().images[0]},
          };
          allProducts.push(obj);
          lastDoc = product;
        });
        setproducts(products.concat(allProducts));
      });
  };

  onProduct = item => {
    navigation.navigate('ListingDetail', {item: item});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        numColumns={2}
        ListFooterComponent={
          <AppTouchableIcon
            underlayColor={'green'}
            name="download"
            size={25}
            text={'Load More'}
            color={Colors.primary}
            style={styles.footercomponent}
            onPress={onLoadMore}
          />
        }
        // keyExtractor={listing => listing.}
        renderItem={({item}) => (
          <TouchableHighlight
            style={{flex: 1, flexDirection: 'row', margin: 10}}
            onPress={() => {
              onProduct(item);
            }}>
            <Card
              title={item.Title}
              subTitle={'₹' + item.Price}
              image={item.image}
            />
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

export default ListingsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light,
  },
  footercomponent: {
    width: 120,
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
  },
});
