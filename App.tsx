import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './src/navigation/AppNavigator';
import AppProvider from './src/hooks';

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <AppProvider>
                <MainStackNavigator />
            </AppProvider>
        </NavigationContainer>
    )
}

export default App
