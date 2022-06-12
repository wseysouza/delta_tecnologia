import React, {useState}from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';

import * as ImagePicker from 'expo-image-picker';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { HeaderScreens } from '../../components/HeaderScreens';

import { api } from '../../services/api';

import * as S from './styles';


export function Register ({navigation}) {
  
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [adressEmpty, setAdressEmpty] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const {control, handleSubmit, resetField} = useForm()

  const onSubmit =  async(data) => {
    try {
        setNameEmpty(false) 
        setAdressEmpty(false)
        setIsLoading(true)

        if(data.name && data.adress){  
          setNameEmpty(false)   
          setAdressEmpty(false)    
          await api.post("/Aluno",{...data, photo:image});
          setIsLoading(false)
          resetField("name")
          resetField("adress")
          setImage(null)
  
          Toast.show(
            `${data.name}, cadastrado com sucesso!!!`,
            {
              duration: 10000,
              position: Toast.positions.CENTER,
              animation: true,
              hideOnPress: true,
              backgroundColor: '#808080',
              textColor: '#fff',
              visible: true,
            },
          );
        } 
        
        if (data.name === "" || data.name === undefined){
          setNameEmpty(true)
          setIsLoading(false)
        }

        if (data.adress === "" || data.adress === undefined){
          setAdressEmpty(true)
          setIsLoading(false)
        }
        
    } catch (error) {
        console.warn("error >> ", error)
        setIsLoading(false)
        Toast.show(
          "Erro, não foi possivel cadastrar.",
          {
            duration: 10000,
            position: Toast.positions.CENTER,
            animation: true,
            hideOnPress: true,
            backgroundColor: '#808080',
            textColor: '#fff',
            visible: true,
          },
        );
    }
  }

  return(
        <S.Container>
            <HeaderScreens title="Cadastro" onPress={() => navigation.goBack()}/>
            <S.Form>
              <S.Fields>
                {image && <S.ImageAttached source={{ uri: image }} />}
                <Input 
                  name="name"
                  placeholder="Nome"
                  control={control}
                />
                {nameEmpty && <S.TextError>*campo obrigatório</S.TextError>}
                <Input 
                  name="adress"
                  placeholder="Endereço"
                  control={control}
                />
                {adressEmpty && <S.TextError>*campo obrigatório</S.TextError>}
                <S.ImageButton 
                  onPress={pickImage} 
                >
                  <S.TextButtonImage>Anexar foto</S.TextButtonImage>
                </S.ImageButton>
              </S.Fields>
              <Button title={isLoading ? "Carregando..." : "Cadastrar"} disabled={isLoading} onPress={handleSubmit(onSubmit)}/>
            </S.Form>
        </S.Container>
    )
}