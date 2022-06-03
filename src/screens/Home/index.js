import React from 'react';
import { MaterialIcons, FontAwesome5, FontAwesome} from '@expo/vector-icons'; 
import { HeaderHome } from '../../components/HeaderHome'
import * as S from './styles';


export function Home ({navigation}) {

    
    return(
        <S.Container>
            <HeaderHome/>
            <S.Title>Qual ação deseja realizar:</S.Title>
            <S.ColunsGrid>
                <S.Buttons theme={{color:"#A2A2FF"}} onPress={() => navigation.navigate("Register")}>
                    <MaterialIcons name="how-to-reg" size={34} color="white" />
                    <S.TextButtons>Cadastrar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#75DDD1"}} onPress={() => navigation.navigate("Edit")}>
                    <FontAwesome5 name="user-edit" size={34} color="white" />
                    <S.TextButtons>Editar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FFC87C"}} onPress={() => navigation.navigate("Search")}>
                    <MaterialIcons name="person-search" size={34} color="white" />
                    <S.TextButtons>Pesquisar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FB9876"}} onPress={() => navigation.navigate("Delete")}>
                    <FontAwesome name="user-times" size={34} color="white" />
                    <S.TextButtons>Deletar Aluno</S.TextButtons>
                </S.Buttons>
            </S.ColunsGrid>
        </S.Container>
    )
}