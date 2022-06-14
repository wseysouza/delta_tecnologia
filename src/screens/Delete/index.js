import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Text, FlatList } from 'react-native';

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';

import { useDelta } from '../../hooks/delta';

import * as S from './styles';

export function Delete ({navigation}) {
  const {
      getListStudent,
      deleteStudent,
      listStudents,
      studentFilter,
      searchStudent,
      clearSearchStudent,
      studentNotFound,
  } = useDelta();

  const [disableDelete, setDisableDelete] = useState(false)

  const {control, handleSubmit, resetField, getValues } = useForm()

  const onSubmit = (data) => {
    searchStudent(data);
  }

  const handleDelete = (id) => {
    setDisableDelete(true)
    deleteStudent(id);
    getListStudent();
    clearSearchStudent();
    searchStudent({name:getValues('name')}, false);
  }

  const handleClear = () => {
    resetField("name");
    clearSearchStudent()
  }

  useEffect(() => {
    getListStudent();
    clearSearchStudent()
  },[])

  useEffect(() => {
    searchStudent({name:getValues('name')}, false);
    setDisableDelete(false)
  },[listStudents])

  return(
    <S.Container>
      <HeaderScreens title="Deletar" onPress={() => navigation.goBack()}/>
      <S.FieldsSearch>
        <Input
          name="name"
          placeholder="Digite o nome do aluno"
          control={control}
        />
        <Button title="Buscar" onPress={handleSubmit(onSubmit)}/>
        <Button title="Limpar" onPress={handleClear}/>
        {studentNotFound && <Text>* Aluno não encontrado, digite novamente!</Text>}
      </S.FieldsSearch>

      {listStudents?.length > 0 &&
        <>
          <S.TitleList>{studentFilter?.length > 0 ? "Resultado da Pesquisa" : "Lista de Alunos"}</S.TitleList>
          <FlatList
            data={studentFilter?.length > 0 ? studentFilter : listStudents }
            keyExtractor={(item) => item?.objectId.toString()}
            renderItem={({ item }) => (
              <StudentDataBox item={item} icon={"delete"} onPress={()=>handleDelete(item.objectId)} disabled={disableDelete}/>
            )}
          />
        </>
      }
    </S.Container>
  )
}
