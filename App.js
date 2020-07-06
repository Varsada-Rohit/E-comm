import React from 'react';

import ListingsScreen from './Apps/Screens/ListingsScreen';
import AppLoading from './Apps/Components/AppLoading';
import UploadProduct from './Apps/Screens/UploadProduct';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ListingDetailsScreen from './Apps/Screens/ListingDetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'list'} component={ListingsScreen} />
        <Stack.Screen name={'Listing'} component={ListingDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
