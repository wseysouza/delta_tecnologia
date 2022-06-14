import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Text, FlatList } from 'react-native';

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';

import { useDelta } from '../../hooks/delta';

import * as S from './styles';


export function Search ({navigation}) {

    const {
        getListStudent,
        listStudents,
        studentFilter,
        searchStudent,
        studentNotFound,
        clearSearchStudent
    } = useDelta();

    const {control, handleSubmit, resetField} = useForm()

    const onSubmit = (data) => {
        searchStudent(data);
    }

    const handleClear = () => {
        resetField("name")
        clearSearchStudent()
    }

    useEffect(() => {
        getListStudent();
        clearSearchStudent();
    }, [])


    return(
        <S.Container>
            <HeaderScreens title="Pesquisar Aluno" onPress={() => navigation.goBack()}/>
            <S.FieldsSearch>
                <Input
                    name="name"
                    placeholder="Digite o nome do aluno"
                    control={control}
                />
                <Button title="Pesquisar" onPress={handleSubmit(onSubmit)}/>
                <Button title="Limpar" onPress={handleClear}/>
                {studentNotFound && <Text>* Aluno não encontrado, digite novamente!</Text>}
            </S.FieldsSearch>
            {listStudents.length > 0 &&
            <>
                <S.TitleList>{studentFilter?.length > 0 ? "Resultado da Pesquisa" : "Lista de Alunos"}</S.TitleList>
                <FlatList
                    data={studentFilter?.length > 0 ? studentFilter : listStudents }
                    keyExtractor={(item) => item.objectId.toString()}
                    renderItem={({ item }) => (
                        <StudentDataBox item={item}/>
                    )}
                />
            </>}
        </S.Container>
    )
}
