import React, {useState, useEffect}from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';

import { Input } from '../../../../components/Form/Input';
import { Button } from '../../../../components/Form/Button';
import { StudentDataBox } from '../../../../components/StudentDataBox';

import { useDelta } from '../../../../hooks/delta';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

import * as S from './styles';


export function ModalEditStudent ({student, updateStudent, openModal, closeModal}) {
    const {
        putStudent,
        getListStudent,
        clearSearchStudent,
        searchStudent
    } = useDelta();

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

    const {control, handleSubmit, resetField, getValues} = useForm()

    useEffect(() => {
        resetField("name")
        resetField("adress")
        setImage(null)
    },[closeModal])

    const onSubmit =  (data) => {

            setNameEmpty(false)
            setAdressEmpty(false)
            setIsLoading(true)

            if(data.name && data.adress){
                setNameEmpty(false)
                setAdressEmpty(false)
                putStudent(student.objectId, {...data, photo:image});
                setIsLoading(false)
                getListStudent();
                clearSearchStudent();
                searchStudent({name:data.name}, false);
                updateStudent()
                resetField("name")
                resetField("adress")
                setImage(null)
                closeModal()
            }

            if (data.name===""){
                setNameEmpty(true)
                setIsLoading(false)
            }

            if (data.adress===""){
                setAdressEmpty(true)
                setIsLoading(false)
            }
    }

    return(
        <Modal
            animattionType="slide"
            visible={openModal}
            transparent={true}
        >
            <S.Container>
                <S.Header>
                    <S.ButtonClose onPress={()=>closeModal()}>
                        <AntDesign name="close" size={30} color="black" />
                    </S.ButtonClose>
                </S.Header>

                <StudentDataBox item={student} />

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
        </Modal>
    )
}
