import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';

import { Input } from '../../../../components/Form/Input';
import { Button } from '../../../../components/Form/Button';
import { StudentDataBox } from '../../../../components/StudentDataBox';

import { useDelta } from '../../../../hooks/delta';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as S from './styles';

interface Props {
    student: {
        objectId: string,
        name: string,
        adress: string,
        photo?: string,
    },
    updateStudent: () => void,
    openModal: boolean,
    closeModal: () => void,
}


export function ModalEditStudent({ student, updateStudent, openModal, closeModal }: Props) {
    const {
        putStudent,
        getListStudent,
        clearSearchStudent,
        searchStudent
    } = useDelta();

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

    const { control, handleSubmit, resetField, getValues, setValue } = useForm()

    useEffect(() => {
        resetField("name")
        resetField("adress")
        setImage("")
    }, [closeModal])



    const onSubmit = () => {

        const data = { name: getValues('name'), adress: getValues('adress') }

        setNameEmpty(false)
        setAdressEmpty(false)
        setIsLoading(true)

        if (data.name && data.adress) {
            setNameEmpty(false)
            setAdressEmpty(false)

            putStudent(student.objectId, { ...data, photo: image });
            setIsLoading(false)
            getListStudent();
            clearSearchStudent();
            searchStudent({ name: data.name }, false);
            updateStudent()
            resetField("name")
            resetField("adress")
            setImage("")
            closeModal()
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

    return (
        <Modal
            animationType='slide'
            visible={openModal}
            transparent={true}
        >
            <S.Container>
                <S.Header>
                    <S.ButtonClose onPress={() => closeModal()}>
                        <AntDesign name="close" size={30} color="black" />
                    </S.ButtonClose>
                </S.Header>

                <StudentDataBox item={student} />

                <S.Fields>
                    {image !== "" && <S.ImageAttached source={{ uri: image }} />}
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
                <Button title={isLoading ? "Carregando..." : "Editar Aluno"} disabled={isLoading} containerColor={"#0000ff"} onPress={handleSubmit(onSubmit)} />
            </S.Container>
        </Modal>
    )
}
