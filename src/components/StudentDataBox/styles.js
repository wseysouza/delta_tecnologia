import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 100px;

    flex-direction: row;
    justify-content: center;
    align-items:center ;

    border-bottom-width: 1px;
    border-bottom-color: #ffffff;
    margin-top: 10px;
`;

export const ColumContent = styled.View`
    height: 100%;
    width: 80%;

    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: center;
`;

export const NameStudent = styled.Text`
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