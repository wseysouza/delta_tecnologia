import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Text} from 'react-native'

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import list from '../../data.json';

import * as S from './styles';
import { StudentDataBox } from '../../components/StudentDataBox';

export function Delete ({navigation}) {
    const[aluno, setAluno] = useState({});

    useEffect(() =>{
        setAluno({})
    },[])
    
    const {control, handleSubmit} = useForm()

    const onSubmit = (data) => {
        setAluno({id:null})
        list.map(item => {
            if(item.name.toLowerCase() === data.name.toLowerCase()){
                setAluno({
                    id: item.id,
                    name:item.name,
                    adress:item.adress,
                    photo:item.photo
                })
            }
        })
    }


    const handleDelete = (name) => {
        console.warn("Aluno deletado:", name)
    }

    return(
        <S.Container>
            <HeaderScreens title="Deletar" onPress={() => navigation.goBack()}/>  
            <S.Form>
                <S.Fields>
                    <Input 
                    name="name"
                    placeholder="Digite o nome do aluno"
                    control={control}
                    />
                    {aluno.id && <StudentDataBox item={aluno}/>}
                    {aluno.id === null && <Text>* Aluno não encontrado, digite novamente!</Text>}
                </S.Fields>
                <S.ViewButtons>
                    {aluno.id && <Button title="Deletar Aluno" theme={{color:"red"}}  onPress={() => handleDelete(aluno.name)} />}
                    <Button title="Buscar" onPress={handleSubmit(onSubmit)}/>
                </S.ViewButtons>
            </S.Form>
            
        </S.Container>
    )
}