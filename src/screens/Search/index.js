import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Text} from 'react-native'

import { HeaderScreens } from '../../components/HeaderScreens'
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';

import { api } from '../../services/api';

import * as S from './styles';


export function Search ({navigation}) {
    
    const[aluno, setAluno] = useState({});
    const[listStudent, setListStudent] = useState([]);

    const getAlunos = async () => {
        try {
            const response = await api.get("/Aluno");
            setListStudent(response.data.results)
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

    return(
        
        <S.Container>
           <HeaderScreens title="Pesquisar Aluno" onPress={() => navigation.goBack()}/>
           <S.Form>
              <S.Fields>
                <Input 
                  name="name"
                  placeholder="Digite o nome do aluno"
                  control={control}
                />
                {aluno.id && <StudentDataBox item={aluno}/>}
                {aluno.id===null && <Text>* Aluno não encontrado, digite novamente!</Text>}
              </S.Fields>
            
              <Button title="Pesquisar" onPress={handleSubmit(onSubmit)}/>
            </S.Form>
            
        </S.Container>
    )
}