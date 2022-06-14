import styled from 'styled-components/native'

export const Container = styled.View`
    background-color:#E5E5E5 ;
    padding: 24px;
    border-radius: 5px;
    margin: 20% 24px 0;
    elevation:20;
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
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin-bottom: 15px;
`;

export const Fields = styled.View`
    margin-top: 20px;
    width: 100%;
    align-items: center;
`;

export const TextError = styled.Text`
    width: 100%;
    text-align: left;
    margin-bottom: 15px;
    padding-left: 10px;
`;

export const Header = styled.View`
    width: 100%;
    align-items: flex-end;
    margin: 0 0 20px;
`;

export const ButtonClose = styled.TouchableOpacity``;
