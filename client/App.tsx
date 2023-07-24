import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {BottomNavigation as Screens, PaperProvider} from 'react-native-paper';
import {NativeRouter, Route, Routes} from 'react-router-native';
import CallScreen from './screens/calls';
import ChatScreen from './screens/chats';
import MessageScreen from './screens/message';
import PeopleScreen from './screens/people';
import StoriesScreen from './screens/stories';
import {INavRoutes} from './types';

export default function App() {
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
    <PaperProvider>
      <NativeRouter>
        <Routes>
          <Route
            path="/"
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
    </PaperProvider>
  );
}
