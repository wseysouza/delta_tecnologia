import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
    margin-top: 15px;
    width:100%;
    background-color: ${props => props.theme.color? props.theme.color: "#FF8C00"} ;
    padding: 16px 18px;
    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: 500;
`;