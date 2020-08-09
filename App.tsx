import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Main from './src/pages/Main';

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#8b10ae" />
      <Main />
    </>
  );
};

export default App;
