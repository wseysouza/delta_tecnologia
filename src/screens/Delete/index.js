import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Text} from 'react-native'

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { api } from '../../services/api';

import * as S from './styles';
import { StudentDataBox } from '../../components/StudentDataBox';

export function Delete ({navigation}) {
    const[aluno, setAluno] = useState({});
    const[listStudent, setListStudent] = useState([]);

    const getAlunos = async (clear) => {
        try {
            const response = await api.get("/Aluno");
            setListStudent(response.data.results)
            if(clear){
                onSubmit()
            }
        } catch (error) {
            console.warn("error >> ", error)
        }
    }  
      
    useEffect(() => {
        getAlunos();
    },[])
    
    const {control, handleSubmit} = useForm()

    const onSubmit = (data) => {
        setAluno({id:null})
        listStudent.map(item => {
            if(item.name.toLowerCase() === data.name.toLowerCase()){
                setAluno({
                    id: item.objectId,
                    name:item.name,
                    adress:item.adress,
                    photo:item.photo
                })
            }
        })
    }


    const handleDelete = async (id) => {
        try {
            await api.delete(`/Aluno/${id}`);
            getAlunos(true);
        } catch (error) {
            console.warn("error >> ", error)
        }
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
                    {aluno.id && <Button title="Deletar Aluno" theme={{color:"#ff0000"}}  onPress={() => handleDelete(aluno.id)} />}
                    <Button title="Buscar" onPress={handleSubmit(onSubmit)}/>
                </S.ViewButtons>
            </S.Form>
            
        </S.Container>
    )
}