import { SafeAreaView, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { styles } from './styles';
import Input from '../../shared/components/Input';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../shared/auth/context/auth.context';

const LoginScreen = () => {
  const { isLoggingIn, onLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>Login</Text>

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
          onPress={handleRegister}
        >
          Login
        </Button>
      </View>

      <Button
        labelStyle={styles.signUpText}
        onPress={() => navigate('/register')}
      >
        Don't have an account ? Signup
      </Button>
    </SafeAreaView>
  );
};

export default LoginScreen;
