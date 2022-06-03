import React from 'react';
import { HeaderScreens } from '../../components/HeaderScreens';
import * as S from './styles';

export function Delete ({navigation}) {
    return(
        <S.Container>
            <HeaderScreens title="Deletar" onPress={() => navigation.goBack()}/>  
              
            
        </S.Container>
    )
}