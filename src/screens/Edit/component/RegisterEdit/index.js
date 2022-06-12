import React, {useState}from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';

import * as ImagePicker from 'expo-image-picker';

import { Input } from '../../../../components/Form/Input';
import { Button } from '../../../../components/Form/Button';

import { api } from '../../../../services/api';

import * as S from './styles';


export function RegisterEdit ({id, updateStudent}) {
  
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

  const {control, handleSubmit} = useForm()

  const onSubmit =  async(data) => {
    try {
        setNameEmpty(false) 
        setAdressEmpty(false)
        setIsLoading(true)

        if(data.name && data.adress){
            setNameEmpty(false)   
            setAdressEmpty(false)      
            await api.put(`/Aluno/${id}`, {...data, photo:image});
            setIsLoading(false)
            updateStudent()

            Toast.show(
                `Aluno ${data.name}, editado com sucesso!!!`,
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

        if (data.name===""){
            setNameEmpty(true)
            setIsLoading(false)
          }
  
        if (data.adress===""){
        setAdressEmpty(true)
        setIsLoading(false)
        }
        
    } catch (error) {
        console.warn("error >> ", error)
        setIsLoading(false)
    }
  }

  return(
        <S.Container>
                <S.Fields>
                    {image && <S.ImageAttached source={{ uri: image }} />}
                    <Input 
                        name="name"
                        placeholder="Editar nome"
                        control={control}
                    />
                    {nameEmpty && <S.TextError>*campo obrigatório</S.TextError>}
                    <Input 
                        name="adress"
                        placeholder="Editar endereço"
                        control={control}
                    />
                    {adressEmpty && <S.TextError>*campo obrigatório</S.TextError>}
                    <S.ImageButton 
                        onPress={pickImage} 
                    >
                        <S.TextButtonImage>Trocar foto</S.TextButtonImage>
                    </S.ImageButton>
                </S.Fields>
                <Button title={isLoading ? "Carregando..." : "Editar Aluno"} disabled={isLoading} theme={{color:"#0000ff"}} onPress={handleSubmit(onSubmit)}/>
        </S.Container>
    )
}