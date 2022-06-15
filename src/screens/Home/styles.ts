import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items:center;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight:500;
`;

export const ColunsGrid = styled.View`
    width: 85%;
    height: 60%;
    margin-top: 40px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: space-between;
`;

interface PropsColor {
    color: string
}

export const Buttons = styled.TouchableOpacity<PropsColor>`
    border-radius: 20px;
    width: 45%;
    height: 47%;
    padding: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.color};
`;

export const TextButtons = styled.Text`
    font-weight: 500;
    color: #ffffff;
    font-size: 18px;
    text-align: center;
`;

