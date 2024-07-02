// app/Menu.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const Menu = ({ onLogout }: { onLogout: (isLoggedIn: boolean) => void }) => {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Menu</Text>
      <Button title="Logout" onPress={() => onLogout(false)} />
    </View>
  );
};

export default Menu;
