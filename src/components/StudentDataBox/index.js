import React from 'react'
import * as S from './styles'

export function StudentDataBox ({item}) {

    return(
        <S.Container>
            <S.Photo source={{
                uri: item.photo
            }} />
            <S.ColumContent>
                <S.NameStudent>{`Nome: ${item.name}`}</S.NameStudent>
                <S.Adress>{`Endereço: ${item.adress}`}</S.Adress>
            </S.ColumContent>
        </S.Container>
    )
}
