import React from 'react';
import{HeaderScreens} from '../../components/HeaderScreens'

import * as S from './styles';

export function Search ({navigation}) {
    return(
        <S.Container>
           <HeaderScreens title="Pesquisar" onPress={() => navigation.goBack()}/>
            
        </S.Container>
    )
}