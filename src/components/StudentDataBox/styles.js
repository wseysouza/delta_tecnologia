import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items:center ;

    border-width: 1px;
    border-color: #ffffff;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
`;

export const ColumContent = styled.View`
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: center;
    background-color: red;
`;

export const NameStudent = styled.Text`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #808080;

    margin-bottom: 5px;
`;

export const Adress = styled.Text`
    width: 100%;
    font-size: 14px;
    color: #808080;
`;

export const Photo = styled.Image`
    width: 40px;
    height: 40px;

    border-radius: 50px;
    margin-right: 10px;
`;

export const Action = styled.TouchableOpacity``;
