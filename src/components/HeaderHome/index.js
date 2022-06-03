import React from 'react';
import * as S from './styles';

const greetingMessage = () => {
	const h = new Date().getHours();
	if (h <= 5) return 'Boa madrugada!!';
	if (h < 12) return 'Bom dia!!';
	if (h < 18) return 'Boa tarde!!';
	return 'Boa noite!!';
};

export function HeaderHome () {
	return (
		<S.MessageRow>
			<S.MessageText>{greetingMessage()}</S.MessageText>
		</S.MessageRow>
)};
