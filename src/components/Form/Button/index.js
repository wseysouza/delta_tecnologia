import React from 'react';

import * as S from './styles';

export function Button ({title, ...rest}) {
    return(
        <S.Container {...rest}>
            <S.Title>
                {title}
            </S.Title>
        </S.Container>
    )
}