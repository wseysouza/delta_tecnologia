import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, FlatList } from 'react-native'

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';
import { ModalEditStudent } from './component/ModalEditStudent';

import { StackHeaderProps } from '@react-navigation/stack';

import { StudentProps, useDelta } from '../../hooks/delta';

import * as S from './styles';


export function Edit({ navigation }: StackHeaderProps) {
    const {
        getListStudent,
        listStudents,
        searchStudent,
        studentNotFound,
        studentFilter,
        clearSearchStudent
    } = useDelta();
    const [studentEdit, setStudentEdit] = useState({ objectId: "", name: "", adress: "" });
    const [modal, setModal] = useState(false);
    const [upList, setUpList] = useState(false)


    useEffect(() => {
        getListStudent();
        clearSearchStudent()
    }, [])

    function handleUpdateStudent() {
        getListStudent();
    }

    const { control, handleSubmit, resetField, getValues } = useForm()

    const onSubmit = () => {
        searchStudent({ name: getValues('name') })
    }

    const handleEdit = (student: StudentProps) => {
        setStudentEdit(student)
        setModal(true)
    }

    const handleClear = () => {
        resetField("name")
        clearSearchStudent()
    }


    return (
        <S.Container>
            <HeaderScreens title="Editar" onPress={() => navigation.goBack()} />
            <S.FieldsSearch>
                <Input
                    name="name"
                    placeholder="Digite o nome do aluno"
                    control={control}
                />
                <Button title="Limpar" onPress={handleClear} />
                <Button title="Buscar" onPress={handleSubmit(onSubmit)} />
                {studentNotFound && <Text>* Aluno não encontrado, digite novamente!</Text>}

            </S.FieldsSearch>
            {listStudents.length > 0 &&
                <>
                    <S.TitleList>{studentFilter?.length > 0 ? "Resultado da Pesquisa" : "Lista de Alunos"}</S.TitleList>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={studentFilter?.length > 0 ? studentFilter : listStudents}
                        keyExtractor={(item) => item?.objectId.toString()}
                        renderItem={({ item }) => (
                            <StudentDataBox item={item} icon={"edit"} onPress={() => handleEdit(item)} />
                        )}
                    />
                </>
            }
            <ModalEditStudent nameSearch={getValues('name')} student={studentEdit} openModal={modal} closeModal={() => setModal(false)} updateStudent={() => handleUpdateStudent()} />
        </S.Container>
    )
}
