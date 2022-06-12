import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Edit } from '../screens/Edit';
import { Delete } from '../screens/Delete';
import { Register } from '../screens/Register';
import { Search } from '../screens/Search';

const { Navigator, Screen } = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Edit" component={Edit} />
      <Screen name="Delete" component={Delete} />
      <Screen name="Register" component={Register} />
      <Screen name="Search" component={Search} />
    </Navigator>
  );
}
