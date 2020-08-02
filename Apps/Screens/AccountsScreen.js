import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import ListItem from '../Components/ListItem';
import Colors from '../Config/Colors';
import Icon from '../Components/Icon';
import ListItemSeperator from '../Components/ListItemSeperator';
import useAuth from '../Auth/useAuth';
const menuItems = [
  {
    title: 'My Listings  ',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: Colors.primary,
    },
  },
  {
    title: 'My Messages  ',
    icon: {
      name: 'email',
      backgroundColor: Colors.secondary,
    },
  },
];
const AccountsScreen = () => {
  const {logout, user} = useAuth();
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.displayName}
          subTitle={user.email}
          image={require('../assets/avatar.jpg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={ListItemSeperator}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logout()}
      />
    </View>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
