import React from 'react';
import {PaperProvider} from 'react-native-paper';
import AppScreens from './screens';

export default function App() {
  return (
    <PaperProvider>
      <AppScreens />
    </PaperProvider>
  );
}
