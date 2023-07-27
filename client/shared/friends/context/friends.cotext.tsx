import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import SocketIOClient from 'socket.io-client';
import { AuthContext } from '../../auth/context/auth.context';
import { IActiveFriend } from '../interfaces';

export const FriendContext = createContext({});

const baseUrl = 'http://localhost:6000';

export const FriendsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isActive, jwt, isLoggedIn, userDetails } = useContext(AuthContext);
  const [friends, setFriends] = useState<IActiveFriend[]>([]);

  const socket = useMemo(
    () =>
      SocketIOClient(baseUrl, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, baseUrl],
  );

  useEffect(() => {
    socket.emit('updateActiveStatus', isActive);

    socket.on(
      'friendActive',
      ({ id, isActive: isFriendActive }: { id: number; isActive: boolean }) => {
        setFriends((prev) => {
          if (userDetails?.id === id) return prev;
          const updateFriends = [...prev];
          (updateFriends.find((f) => f.id === id) as IActiveFriend).isActive =
            isActive;
          return updateFriends;
        });
      },
    );
  }, [socket, isActive, userDetails]);

  return <FriendContext.Provider value={{}}>{children}</FriendContext.Provider>;
};
