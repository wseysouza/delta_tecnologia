import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, FlatList } from 'react-native';

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';

import { useDelta, DataStudentProps } from '../../hooks/delta';
import { StackHeaderProps } from '@react-navigation/stack';

import * as S from './styles';

export function Delete({ navigation }: StackHeaderProps) {
    const {
        getListStudent,
        deleteStudent,
        listStudents,
        studentFilter,
        searchStudent,
        clearSearchStudent,
        studentNotFound,
    } = useDelta();

    const { control, handleSubmit, resetField, getValues } = useForm()
    const [disabledDelete, setDisabledDelete] = useState(false)

    const onSubmit = () => {
        searchStudent({ name: getValues('name') });
    }

    const handleDelete = async (id: string) => {
        setDisabledDelete(true)
        deleteStudent(id, getValues('name'));
        setTimeout(() => {
            getListStudent()
        }, 3000);
        setTimeout(() => {
            setDisabledDelete(false)
        }, 3500);
    }

    const handleClear = () => {
        resetField("name");
        clearSearchStudent()
    }

    useEffect(() => {
        getListStudent();
        clearSearchStudent()
    }, [])

    return (
        <S.Container>
            <HeaderScreens title="Deletar" onPress={() => navigation.goBack()} />
            <S.FieldsSearch>
                <Input
                    name="name"
                    placeholder="Digite o nome do aluno"
                    control={control}
                />
                <Button title="Buscar" onPress={handleSubmit(onSubmit)} />
                <Button title="Limpar" onPress={handleClear} />
                {studentNotFound && <Text>* Aluno não encontrado, digite novamente!</Text>}
            </S.FieldsSearch>

            {listStudents?.length > 0 &&
                <>
                    <S.TitleList>{studentFilter?.length > 0 ? "Resultado da Pesquisa" : "Lista de Alunos"}</S.TitleList>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={studentFilter?.length > 0 ? studentFilter : listStudents}
                        keyExtractor={(item) => item.objectId.toString()}
                        renderItem={({ item }) => (
                            <StudentDataBox item={item} icon={disabledDelete ? "auto-delete" : "delete"} onPress={() => handleDelete(item.objectId)} disabled={disabledDelete} />
                        )}
                    />
                </>
            }
        </S.Container>
    )
}
