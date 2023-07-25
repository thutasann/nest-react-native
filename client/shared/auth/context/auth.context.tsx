import { useMutation } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';
import { IAuthContext } from '../../../types';
import { ILoginUser, IUserDetails } from '../interfaces/UserDetails';
import { login } from '../requests';

export const AuthContext = createContext<IAuthContext>({
  userDetails: undefined,
  jwt: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  onLogin: () => null,
  onLogout: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<IUserDetails>();
  const [jwt, setJwt] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginMutation = useMutation(
    (loginUser: ILoginUser) => login(loginUser),
    {
      onSuccess: (credentials) => {
        setIsLoggingIn(false);
        setUserDetails(credentials.user);
        setJwt(credentials.token);
        setIsLoggedIn(true);
      },
      onSettled: () => {
        setIsLoggingIn(false);
      },
    },
  );

  const loginHandler = (loginUser: ILoginUser) => {
    setIsLoggedIn(true);
    loginMutation.mutate(loginUser);
  };

  const logoutHandler = () => {
    setUserDetails(undefined);
    setJwt(undefined);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        jwt,
        isLoggedIn,
        isLoggingIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
