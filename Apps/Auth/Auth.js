import auth from '@react-native-firebase/auth';

const register = async regInfo => {
  try {
    const result = await auth().createUserWithEmailAndPassword(
      regInfo.email,
      regInfo.password,
    );
    await result.user.updateProfile({displayName: regInfo.dname});

    return auth().currentUser;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return (result = {error: 'Email already in use '});
    } else {
      return (result = {error: 'something went wrong try again'});
    }
  }
};

const login = async loginInfo => {
  try {
    const result = await auth().signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );
    return result;
  } catch (error) {
    if (error.code === 'auth/user-not-found')
      return (result = {error: 'user not found'});
    if (error.code === 'auth/wrong-password') {
      return (result = {error: 'Wrong password'});
    }
    console.log('error while login', error);
    return (result = {error: error});
  }
};

export default {
  register,
  login,
};
