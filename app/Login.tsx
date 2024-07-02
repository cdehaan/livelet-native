// app/Login.tsx
import { authApi } from '@/Api/authApi';
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const Login = ({ onLogin }: { onLogin: (isLoggedIn: boolean) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email) {
      alert('Please enter a username');
      return;
    }
    if (!password) {
      alert('Please enter a password');
      return;
    }
    try {
      const response = await authApi.login({ email: email, password: password });
      console.log(response.data.data);
      onLogin(true);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(error.toJSON());
      }
    }

  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;