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

    const {getListStudent, listStudents} = useDelta();
    const [StudentSearch, setStudentSearch] = useState([]);
    const [studentNotFound, setStudentNotFound] = useState(false);

    useEffect(() => {
        getListStudent();
    }, [])

    const newStudants = [];

    const { control, handleSubmit, resetField } = useForm()

    const onSubmit = (data) => {
        setStudentNotFound(true)
        listStudents.map(student => {
            if(student.name.toLowerCase() === data.name.toLowerCase()){
                newStudants.push(student)
                setStudentNotFound(false)
            }
        })
        setStudentSearch(newStudants)
    }

    const handleClear = () => {
        resetField("name")
        setStudentSearch([])
        setStudentNotFound(false)
    }

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
            <S.TitleList>{StudentSearch.length > 0 ? "Resultado da Pesquisa" : "Lista de Alunos"}</S.TitleList>
            <FlatList
                data={StudentSearch.length > 0 ? StudentSearch :listStudents }
                keyExtractor={(item) => item.objectId.toString()}
                renderItem={({ item }) => (
                    <StudentDataBox item={item}/>
                )}
            />
        </S.Container>
    )
}
