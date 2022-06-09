import React, {useState}from 'react';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

import { Input } from '../../../../components/Form/Input';
import { Button } from '../../../../components/Form/Button';

import { api } from '../../../../services/api';

import * as S from './styles';


export function RegisterEdit ({id, updateStudent}) {
  
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        console.warn(">>ID", id)
        await api.put(`/Aluno/${id}`, {...data, photo:image});
        setIsLoading(false)
        updateStudent()
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
                        placeholder="Nome"
                        control={control}
                    />
                    <Input 
                        name="adress"
                        placeholder="Endereço"
                        control={control}
                    />
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