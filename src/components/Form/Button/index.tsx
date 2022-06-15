import React from 'react';
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles';

interface Props extends TouchableOpacityProps {
    title: string
    containerColor?: string,
}

export function Button({ title, containerColor, ...rest }: Props) {
    return (
        <S.Container {...rest} containerColor={containerColor}>
            <S.Title>
                {title}
            </S.Title>
        </S.Container>
    )
}
