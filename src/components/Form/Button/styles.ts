import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native'

interface Props {
    containerColor?: string
}

export const Container = styled(TouchableOpacity) <Props>`
    margin-top: 15px;
    width:100%;
    background-color: ${props => props.containerColor ? props.containerColor : "#FF8C00"};;
    padding: 16px 18px;
    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: 500;
`;
