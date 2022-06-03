import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';
import { Button } from "react-native";

export function HeaderScreens ({navigation, title}) {
    return(
        <S.Container>
            <S.Arrow onPress={() => navigation.goBack()}>
                <MaterialIcons name="keyboard-arrow-left" size={50} color="white" />
            </S.Arrow>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}