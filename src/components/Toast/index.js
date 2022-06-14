import React from 'react';
import Toast from 'react-native-root-toast';

export const toast = {
    success: ({ menssage }) => Toast.show(
        menssage,
        {
            duration: 1000,
            position: Toast.positions.CENTER,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#00B300',
            textColor: '#fff',
            visible: true,
        },
    ),
    warn: ({ menssage }) => Toast.show(
        menssage,
        {
            duration: 1000,
            position: Toast.positions.CENTER,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#cc0000',
            textColor: '#fff',
            visible: true,
        },
    )
}
