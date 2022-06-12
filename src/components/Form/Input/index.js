import React from 'react';
import { useController } from 'react-hook-form';

import * as S from './styles';

export function Input ({name, placeholder, control}) {
    const { field } = useController({
        control,
        defaultValue:'',
        name,
    })
    return(
        <S.Container placeholder={placeholder} onChangeText={field.onChange} value={field.value} />
    )
}