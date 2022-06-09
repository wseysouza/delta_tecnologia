import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';

export function HeaderScreens ({title, ...rest}) {
    return(
        <S.Container>
            <S.Arrow {...rest}>
                <MaterialIcons name="keyboard-arrow-left" size={50} color="#ffffff" />
            </S.Arrow>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}