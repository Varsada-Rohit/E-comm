import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feednavigator from './FeedNavigator';
import UploadProduct from '../Screens/UploadProduct';
import AccountsScreen from '../Screens/AccountsScreen';
import Colors from '../Config/Colors';
import TabBarIcon from '../Components/TabBarIcon';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{showLabel: false, activeTintColor: Colors.primary}}>
      <Tab.Screen
        name="Feed"
        component={Feednavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={UploadProduct}
        options={({navigation}) => {
          return {
            tabBarButton: () => (
              <TabBarIcon onPress={() => navigation.navigate('Add')} />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
