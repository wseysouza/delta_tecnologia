import React, {useState, useEffect} from 'react';
import { MaterialIcons, FontAwesome5, FontAwesome} from '@expo/vector-icons'; 
import { HeaderHome } from '../../components/HeaderHome'
import { api } from '../../services/api';

import * as S from './styles';


export function Home ({navigation}) {
    const [reponseApi, setReponseApi] = useState(false)

    const getAlunos = async () => {
        try {
            await api.get("/Aluno");
            setReponseApi(true)
        } catch (error) {
            console.warn("error >> ", error)
        }
    }
    useEffect(() => {
        getAlunos();
    },[])
    return(
        <S.Container>
            <HeaderHome/>
            <S.Title>{reponseApi? "Dados carregados" : "Carregando os dados..."}</S.Title>
            <S.ColunsGrid>
                <S.Buttons theme={{color:"#A2A2FF"}} disabled={!reponseApi} onPress={() => navigation.navigate("Register")}>
                    <MaterialIcons name="how-to-reg" size={34} color="#fff" />
                    <S.TextButtons>Cadastrar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#75DDD1"}} disabled={!reponseApi} onPress={() => navigation.navigate("Edit")}>
                    <FontAwesome5 name="user-edit" size={34} color="#fff" />
                    <S.TextButtons>Editar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FFC87C"}} disabled={!reponseApi} onPress={() => navigation.navigate("Search")}>
                    <MaterialIcons name="person-search" size={34} color="#fff" />
                    <S.TextButtons>Pesquisar Aluno</S.TextButtons>
                </S.Buttons>
                <S.Buttons theme={{color:"#FB9876"}} disabled={!reponseApi} onPress={() => navigation.navigate("Delete")}>
                    <FontAwesome name="user-times" size={34} color="#fff" />
                    <S.TextButtons>Deletar Aluno</S.TextButtons>
                </S.Buttons>
            </S.ColunsGrid>
        </S.Container>
    )
}