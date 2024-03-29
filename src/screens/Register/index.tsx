import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as ImagePicker from 'expo-image-picker';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { HeaderScreens } from '../../components/HeaderScreens';

import { useDelta } from '../../hooks/delta';

import { StackHeaderProps } from '@react-navigation/stack';

import * as S from './styles';

interface imageProps {

}

export function Register({ navigation }: StackHeaderProps) {
    const { postStudent } = useDelta();
    const [image, setImage] = useState("");
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

    const { control, handleSubmit, resetField, getValues } = useForm()

    const onSubmit = () => {
        const data = { name: getValues('name'), adress: getValues('adress') }
        setNameEmpty(false)
        setAdressEmpty(false)
        setIsLoading(true)

        if (data.name && data.adress) {
            setNameEmpty(false)
            setAdressEmpty(false)
            if (image === "") {
                postStudent({ ...data, photo: null });
            } else {
                postStudent({ ...data, photo: image });
            }
            setIsLoading(false)
            resetField("name")
            resetField("adress")
            setImage("")
        }

        if (data.name === "" || data.name === undefined) {
            setNameEmpty(true)
            setIsLoading(false)
        }

        if (data.adress === "" || data.adress === undefined) {
            setAdressEmpty(true)
            setIsLoading(false)
        }
    }
    const handleClear = () => {
        resetField("name");
        resetField("adress");
        setImage("")
        setNameEmpty(false)
        setAdressEmpty(false)
    }
    return (
        <S.Container>
            <HeaderScreens title="Cadastro" onPress={() => navigation.goBack()} />
            <S.Form>
                <S.Fields>
                    {image !== "" && <S.ImageAttached source={{ uri: image }} />}
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
                <S.BoxButtons>
                    <Button title="Limpar" onPress={handleClear} />
                    <Button title={isLoading ? "Carregando..." : "Cadastrar"} disabled={isLoading} onPress={handleSubmit(onSubmit)} />
                </S.BoxButtons>
            </S.Form>
        </S.Container>
    )
}
