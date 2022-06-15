import styled from 'styled-components/native';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    width: 100%;
    height: 110px;
    align-items: center;
    flex-direction: row;
`;

export const Title = styled.Text`
    width:80% ;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
`;

export const Arrow = styled(TouchableOpacity)`
    width: 10%;
    height: 150px;
    align-items: center;
    justify-content: center;
`;

