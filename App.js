import React, {useState, useContext, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './Apps/Navigations/AppNavigator';
import Temp from './Apps/Components/Temp';
import Register from './Apps/Screens/Register';
import Login from './Apps/Screens/Login';
import auth from '@react-native-firebase/auth';
import AuthContext from './Apps/Auth/Context';
import AuthNavigator from './Apps/Navigations/AuthNavigator';

function App() {
  const [imageUris, setImageUris] = useState([]);
  handleAdd = uri => {
    setImageUris(imageUris.concat(uri));
  };

  handleRemove = uri => {
    setImageUris(imageUris.filter(img => img !== uri));
  };

  useEffect(() => {
    setuser(auth().currentUser);
  }, []);

  const [user, setuser] = useState();

  return (
    // <Login />

    // <Temp />
    // <FormInputImage />
    <AuthContext.Provider value={{user, setuser}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    // {/* <AppNavigator /> */}
    // <ImageInputList
    //   uris={imageUris}
    //   onAddImage={handleAdd}
    //   onRemoveImage={handleRemove}
    // />
  );
}

export default App;
