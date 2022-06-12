import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigation/AppNavigator';
import AppProvider from './src/hooks';

export default function App() {
  return(
    <AppProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </AppProvider>
  )
}

