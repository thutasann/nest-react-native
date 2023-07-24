import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

const friends = [
  {
    id: 1,
    name: 'Victor',
  },
  {
    id: 2,
    name: 'Larry',
  },
  {
    id: 3,
    name: 'Barry',
  },
];

const ChatScreen = () => {
  const navigate = useNavigate();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {friends.map(friend => (
          <Pressable
            key={friend.id}
            onPress={() => navigate(`/chat/${friend.id}`)}>
            <View style={styles.friend}>
              <Avatar.Image
                size={62}
                style={styles.profilePic}
                source={{
                  uri: `https://randomuser.me/api/portraits/men/${friend.id}.jpg`,
                }}
              />
              <View>
                <Text>{friend.name}</Text>
                <Text>This was the last message | Sun</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
