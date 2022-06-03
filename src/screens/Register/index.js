import React, {useState}from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Form/Input';
import * as ImagePicker from 'expo-image-picker';

import * as S from './styles';
import { Button } from '../../components/Form/Button';
import { HeaderScreens } from '../../components/HeaderScreens';


export function Register () {
  
  const [image, setImage] = useState(null);

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
  const onSubmit = (data) => console.warn({...data, photo:image})

  return(
        <S.Container>
            <HeaderScreens title="Cadastro"/>
            <S.Form>
              <S.Fields>
                {image && <S.ImageAttached source={{ uri: image }} />}
                <Input 
                  name="nome"
                  placeholder="Nome"
                  control={control}
                />
                <Input 
                  name="endereco"
                  placeholder="Endereço"
                  control={control}
                />
                <S.ImageButton 
                  onPress={pickImage} 
                >
                  <S.TextButtonImage>Anexar foto</S.TextButtonImage>
                </S.ImageButton>
              </S.Fields>
              <Button title="Cadastrar" onPress={handleSubmit(onSubmit)}/>
            </S.Form>
        </S.Container>
    )
}