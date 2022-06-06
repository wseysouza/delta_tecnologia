import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Text} from 'react-native'

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import list from '../../data.json';

import * as S from './styles';
import { StudentDataBox } from '../../components/StudentDataBox';

export function Edit ({navigation}) {
    const[aluno, setAluno] = useState({});
    const[studentEdit, setStudentEdit] = useState(false);

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


    const handleEdit = (name) => {
        setStudentEdit(true)
        console.warn("Aluno deletado:", name)
    }
    return(
        <S.Container>
            <HeaderScreens title="Editar" onPress={() => navigation.goBack()}/>
            <S.Form>
                <S.Fields>
                    <Input 
                    name="name"
                    placeholder="Digite o nome do aluno"
                    control={control}
                    />
                    {aluno.id && <StudentDataBox item={aluno}/>}
                    {aluno.id===null && <Text>* Aluno não encontrado, digite novamente!</Text>}

                    {studentEdit && 
                        <>
                            <Input 
                                name="nome"
                                placeholder="Nome"
                                control={control}
                                defaultValue={aluno.name}
                            />
                            <Input 
                                name="endereco"
                                placeholder="Endereço"
                                control={control}
                                defaultValue={aluno.adress}
                            />
                        </>
                    }

                </S.Fields>
                <S.ViewButtons>
                    {aluno.id && <Button title="Editar Aluno?" theme={{color:"blue"}}  onPress={() => handleEdit(aluno.name)} />}
                    <Button title="Buscar" onPress={handleSubmit(onSubmit)}/>
                </S.ViewButtons>
            </S.Form>
            
        </S.Container>
    )
}