import {View, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {styles} from './styles';
import {useNavigate, useParams} from 'react-router-native';

const MessageScreen = () => {
  const {chatId} = useParams<{chatId: string}>();
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate('/')} />
      </Appbar.Header>
      <View style={styles.messageContainer}>
        <Text>Chat Id: {chatId}</Text>
      </View>
    </View>
  );
};

export default MessageScreen;
