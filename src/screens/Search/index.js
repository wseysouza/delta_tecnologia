import React,{useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';

import{HeaderScreens} from '../../components/HeaderScreens'
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import list from '../../data.json';

import * as S from './styles';
import { StudentDataBox } from '../../components/StudentDataBox';

export function Search ({navigation}) {
    
    const[aluno, setAluno] = useState({});

    useEffect(() =>{
        setAluno({})
    },[])
    
    const {control, handleSubmit} = useForm()

    const onSubmit = (data) => {
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
              </S.Fields>
            
              <Button title="Pesquisar" onPress={handleSubmit(onSubmit)}/>
            </S.Form>
            
        </S.Container>
    )
}