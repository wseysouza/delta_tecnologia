import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Text, FlatList } from 'react-native';
import Toast from 'react-native-root-toast';

import { HeaderScreens } from '../../components/HeaderScreens';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { StudentDataBox } from '../../components/StudentDataBox';

import { useDelta } from '../../hooks/delta';

import * as S from './styles';

export function Delete ({navigation}) {
    const {getListStudent, deleteStudent, listStudents, student} = useDelta();
    const [StudentSearch, setStudentSearch] = useState([]);
    const [studentNotFound, setStudentNotFound] = useState(false);



  useEffect(() => {
    getListStudent();
  },[])

  const newStudants = [];
  const {control, handleSubmit, resetField} = useForm()

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

  function handleDelete (id)  {
    deleteStudent(id)
    onSubmit()
  }

  const handleClear = () => {
    resetField("name")
    setStudentSearch([])
    setStudentNotFound(false)
}

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

          {StudentSearch.length > 0 &&
            <>
              <S.TitleList>Resultado da Pesquisa</S.TitleList>
              <FlatList
                data={StudentSearch}
                keyExtractor={(item) => item?.objectId.toString()}
                renderItem={({ item }) => (
                  <StudentDataBox item={item} icon={"delete"} handleAction={(id) => handleDelete(id)}/>
                )}
              />
            </>
          }
      </S.Container>
    )
}
