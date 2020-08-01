import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../Screens/WelcomeScreen';
import Login from '../Screens/Login';
import Register from '../Screens/Register';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
