import React, {useEffect} from 'react';
import { MaterialIcons, FontAwesome5, FontAwesome} from '@expo/vector-icons';
import { HeaderHome } from '../../components/HeaderHome'

import { useDelta } from '../../hooks/delta';

import * as S from './styles';

export function Home ({navigation}) {
    const {
        getListStudent,
        clearSearchStudent
    } = useDelta();

    useEffect(() => {
        getListStudent();
        clearSearchStudent()
    },[])
    return(
        <S.Container>
            <HeaderHome/>
            <S.Title>Selecione a ação desejada:</S.Title>
            <S.ColunsGrid>
                <S.Buttons theme={{color:"#A2A2FF"}} onPress={() => navigation.navigate("Register")}>
                    <MaterialIcons name="how-to-reg" size={34} color="#fff" />
                    <S.TextButtons>Cadastrar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#75DDD1"}} onPress={() => navigation.navigate("Edit")}>
                    <FontAwesome5 name="user-edit" size={34} color="#fff" />
                    <S.TextButtons>Editar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FFC87C"}} onPress={() => navigation.navigate("Search")}>
                    <MaterialIcons name="person-search" size={34} color="#fff" />
                    <S.TextButtons>Pesquisar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FB9876"}} onPress={() => navigation.navigate("Delete")}>
                    <FontAwesome name="user-times" size={34} color="#fff" />
                    <S.TextButtons>Deletar Aluno</S.TextButtons>
                </S.Buttons>
            </S.ColunsGrid>
        </S.Container>
    )
}
