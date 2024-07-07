import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { UserContext } from '@/contexts/UserContext';

const Menu = ({ onLogout }: { onLogout: (isLoggedIn: boolean) => void }) => {
  const router = useRouter();
  const { token } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Button title="Go to Profile" onPress={() => router.push('/profile')} />
      <Button title="Go to Vehicles" onPress={() => router.push('/vehicles')} />
      <Button title="Logout" onPress={() => {onLogout}} />
      <Text>Your token: {token ? (token.substring(0, 20) + "...") : 'Unknown'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padme: {
    margin: 10,
  }
});

export default Menu;
