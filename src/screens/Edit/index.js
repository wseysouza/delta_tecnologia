import React from 'react';
import { HeaderScreens } from '../../components/HeaderScreens';
import * as S from './styles';

export function Edit ({navigation}) {
    return(
        <S.Container>
            <HeaderScreens title="Editar" onPress={() => navigation.goBack()}/>
              
            
        </S.Container>
    )
}