import {SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-native';
import {styles} from './styles';
import Input from '../../shared/components/Input';
import {Button} from 'react-native-paper';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>Facebook</Text>
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mb={3}
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mb={3}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          mb={3}
        />

        <Input
          secure
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          mb={3}
        />

        <Button
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
          mode="contained"
          onPress={handleRegister}>
          Register
        </Button>
      </View>
      <Button labelStyle={styles.signUpText} onPress={() => navigate('/login')}>
        Already a member ? Login
      </Button>
    </SafeAreaView>
  );
};

export default RegisterScreen;
