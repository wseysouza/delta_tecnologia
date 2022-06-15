import React from "react";
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface Props extends TouchableOpacityProps {
    title: string
}

export const HeaderScreens = ({ title, ...rest }: Props) => {
    return (
        <S.Container>
            <S.Arrow {...rest}>
                <MaterialIcons name="keyboard-arrow-left" size={50} color="#ffffff" />
            </S.Arrow>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}
