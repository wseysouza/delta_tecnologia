import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as S from './styles';

interface Props extends TouchableOpacityProps {
    item: {
        photo?: string,
        name: string,
        adress: string,
    },
    icon?: string,
}

export function StudentDataBox({ item, icon, ...rest }: Props) {

    return (
        <S.Container>
            <S.Photo source={{
                uri: item.photo
            }} />
            <S.ColumContent boxWidth={icon ? "75%" : "85%"}>
                <S.NameStudent>{`Nome: ${item.name}`}</S.NameStudent>
                <S.Adress>{`Endereço: ${item.adress}`}</S.Adress>
            </S.ColumContent>
            {icon &&
                <S.Action {...rest}>
                    {icon === "delete" && <MaterialIcons name="delete" size={35} color="#808080" />}
                    {icon === "edit" && <Entypo name="edit" size={35} color="#808080" />}
                </S.Action>
            }

        </S.Container>
    )
}
