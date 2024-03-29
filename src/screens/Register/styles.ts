import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #A2A2FF;
    flex: 1;
    padding: 24px;
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content:  space-between;
`;

export const ImageButton = styled.TouchableOpacity`
    margin: 10px 0;
    background-color: #393B47;
    width: 100%;
    padding: 16px 18px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const TextButtonImage = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
`;

export const ImageAttached = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 100px;
    margin-bottom: 15px;
`;

export const Fields = styled.View`
    width: 100%;
    align-items: center;
`;

export const BoxButtons = styled.View`
    width: 100%;
`;

export const TextError = styled.Text`
    width: 100%;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 10px;
`;
