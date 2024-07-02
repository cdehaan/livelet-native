// app/index.tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import Login from './Login';
import Menu from './Menu';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? (
        <Menu onLogout={setIsLoggedIn} />
      ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
    </View>
  );
}
