import React from 'react'
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export function StudentDataBox ({item, icon, ...rest}) {

    return(
        <S.Container>
            <S.Photo source={{
                uri: item.photo
            }} />
            <S.ColumContent width={icon? "75%" : "85%" }>
                <S.NameStudent>{`Nome: ${item.name}`}</S.NameStudent>
                <S.Adress>{`Endereço: ${item.adress}`}</S.Adress>
            </S.ColumContent>
            {icon &&
                <S.Action {...rest}>
                    {icon === "delete" && <MaterialIcons name="delete" size={40} color="#808080" />}
                    {icon === "edit" && <Entypo name="edit" size={40} color="#808080" />}
                </S.Action>
            }

        </S.Container>
    )
}
