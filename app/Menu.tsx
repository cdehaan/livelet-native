import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { UserContext } from '@/contexts/UserContext';

const Menu = ({ onLogout }: { onLogout: (isLoggedIn: boolean) => void }) => {
  const { token, setToken } = useContext(UserContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch('https://livelet-api.adamo.tech/api/search-vehicle/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('Response data:', data.data);
          setVehicles(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const vehiclesList = vehicles.map((vehicle: any) => (
    <View key={vehicle.id} style={{
      width: "60%", borderColor: "#888", borderWidth: 1, marginVertical: 4, borderRadius: 12,
      padding: 7
    }}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: vehicle.image.path }}
        />
        <Text>{vehicle.name}</Text>
      </View>
      <Text>Available: {vehicle.borrowing ? "✗" : "✔"}, Late: {vehicle.isLate ? "✔" : "✗"}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Menu</Text>
      <Button title="Logout" onPress={() => { setToken(null); onLogout(false); }} />
      <Text>Your token: {token ? (token.substring(0, 20) + "...") : 'Unknown'}</Text>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          {vehiclesList}
        </ScrollView>
      </View>
    </View>
  );
};

export default Menu;
