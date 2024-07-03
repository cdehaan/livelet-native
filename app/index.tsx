import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './Login';
import Menu from './Menu';
import { UserProvider } from '../contexts/UserContext';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        {isLoggedIn ? (
          <Menu onLogout={setIsLoggedIn} />
        ) : (
          <Login onLogin={setIsLoggedIn} />
        )}
      </View>
    </UserProvider>
  );
}
