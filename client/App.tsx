import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppScreens from './screens';
import { AuthProvider } from './shared/auth/context/auth.context';

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <PaperProvider>
          <AppScreens />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
