import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {Edit} from '../screens/Edit';
import {Delete} from '../screens/Delete';
import {Register} from '../screens/Register';
import {Search} from '../screens/Search';

const Stack = createStackNavigator();

export function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Delete" component={Delete} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}