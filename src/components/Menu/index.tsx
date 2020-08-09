import React from 'react';
import { Animated } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  Code,
  Nav,
  NavItems,
  NavText,
  SignOutButton,
  SignOutButtonText,
} from './styles';

interface Props {
  translateY: Animated.Value;
}

const Menu: React.FC<Props> = ({ translateY }) => {
  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 150],
          outputRange: [0, 1],
        }),
      }}
    >
      <Code>
        <QRCode
          value="https://andrecoelho.dev"
          size={80}
          backgroundColor="#fff"
          color="#8b10ae"
        />
      </Code>

      <Nav>
        <NavItems>
          <MaterialIcons name="help-outline" size={20} color="#fff" />
          <NavText>Me ajuda</NavText>
        </NavItems>
        <NavItems>
          <MaterialIcons name="person-outline" size={20} color="#fff" />
          <NavText>Perfil</NavText>
        </NavItems>
        <NavItems>
          <MaterialIcons name="credit-card" size={20} color="#fff" />
          <NavText>Configurar catão</NavText>
        </NavItems>
        <NavItems>
          <MaterialIcons name="smartphone" size={20} color="#fff" />
          <NavText>Configurações do app</NavText>
        </NavItems>
      </Nav>

      <SignOutButton onPress={() => {}} activeOpacity={0.8}>
        <SignOutButtonText>Sair app</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default Menu;
