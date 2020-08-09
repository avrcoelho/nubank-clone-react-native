import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Top, Logo, Title } from './styles';
import logoImg from '../../assets/images/Nubank_Logo.png';

const Header: React.FC = () => {
  return (
    <Container>
      <Top>
        <Logo source={logoImg} />
        <Title>André Coelho</Title>
      </Top>
      <MaterialIcons name="keyboard-arrow-down" size={20} color="#fff" />
    </Container>
  );
};

export default Header;
