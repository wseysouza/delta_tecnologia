import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import * as S from './styles';

interface Props extends UseControllerProps {
    name: string,
    placeholder: string,
}

export function Input({ name, placeholder, control }: Props) {
    const { field } = useController({
        control,
        defaultValue: '',
        name,
    })
    return (
        <S.Container placeholder={placeholder} onChangeText={field.onChange} value={field.value} />
    )
}
