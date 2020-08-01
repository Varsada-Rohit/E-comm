import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListingsScreen from '../Screens/ListingsScreen';
import ListingDetailsScreen from '../Screens/ListingDetailsScreen';

const Stack = createStackNavigator();

const Feednavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} mode={'modal'}>
      <Stack.Screen name="Listing" component={ListingsScreen} />
      <Stack.Screen name="ListingDetail" component={ListingDetailsScreen} />
    </Stack.Navigator>
  );
};

export default Feednavigator;
