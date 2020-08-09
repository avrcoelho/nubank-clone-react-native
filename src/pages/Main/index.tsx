import React, { useCallback } from 'react';
import { Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Tabs from '../../components/Tabs';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from './styles';

const Main: React.FC = () => {
  let offset = 0;
  const translateY = new Animated.Value(0);

  //capta a posição do card arrastado e passa para o transalteY
  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onHandlerStateChange = useCallback(
    (event: PanGestureHandlerStateChangeEvent) => {
      //estado anterior
      if (event.nativeEvent.oldState === State.ACTIVE) {
        let opened = false;
        const { translationY } = event.nativeEvent;

        // atualiza o offset de quanto o usuario arrastou
        offset += translationY;
        console.log(translationY);

        if (translationY >= 50) {
          opened = true;
        } else {
          // faz evitar voltar para a posição inicial. Quando termina a anicação, ela vai começar do ponto que parou, não do ponto 0
          translateY.setOffset(0);
          // restarta o valor para offset Value e não para o valor que o usuario deu o scroll
          translateY.setValue(offset);
          offset = 0;
        }

        // animação com duração amxima de tempo
        Animated.timing(translateY, {
          toValue: opened ? 380 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          offset = opened ? 380 : 0;
          // faz evitar voltar para a posição inicial. Quando termina a anicação, ela vai começar do ponto que parou, não do ponto 0
          translateY.setOffset(offset);
          // restarta o valor para 0 e não para o valor que o usuario deu o scroll
          translateY.setValue(0);
        });
      }
    },
    [],
  );

  return (
    <>
      <Container>
        <Header />
        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 380],
                      outputRange: [-20, 0, 380],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            >
              <CardHeader>
                <MaterialIcons name="attach-money" size={28} color="#666" />
                <MaterialIcons name="visibility-off" size={28} color="#666" />
              </CardHeader>
              <CardContent>
                <Title>Saldo disponível</Title>
                <Description>R$ 12.548,00</Description>
              </CardContent>
              <CardFooter>
                <Annotation>
                  Tansferência de R$ 50,00 recebida de John Doe hoje as 15:00h
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
      </Container>
    </>
  );
};

export default Main;
