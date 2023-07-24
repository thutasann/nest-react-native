import React from 'react';
import {NativeRouter, Route, Routes} from 'react-router-native';
import {BottomNavigation as Screens} from 'react-native-paper';
import ChatScreen from './chats';
import CallScreen from './calls';
import StoriesScreen from './stories';
import PeopleScreen from './people';
import {INavRoutes} from '../types';
import MessageScreen from './message';
import LoginScreen from './login';
import RegisterScreen from './register';

const AppScreens = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<INavRoutes[]>([
    {
      key: 'chats',
      title: 'Chats',
      focusedIcon: 'chat',
    },
    {key: 'calls', title: 'Calls', focusedIcon: 'video'},
    {key: 'people', title: 'People', focusedIcon: 'account'},
    {key: 'stories', title: 'Stroies', focusedIcon: 'book'},
  ]);

  const renderScene = Screens.SceneMap({
    chats: ChatScreen,
    calls: CallScreen,
    people: PeopleScreen,
    stories: StoriesScreen,
  });

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />

        <Route
          path="/chats"
          element={
            <Screens
              navigationState={{index, routes}}
              onIndexChange={setIndex}
              renderScene={renderScene}
            />
          }
        />
        <Route path="/chat/:chatId" element={<MessageScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default AppScreens;
