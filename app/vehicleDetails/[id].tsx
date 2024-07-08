// /app/vehicleDetails/[id].tsx
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { VehicleType } from '@/types';

const VehicleDetails = () => {
  const { token } = useContext(UserContext);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(`https://livelet-api.adamo.tech/api/vehicleItem-detail/${id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('Response data:', data.data);
          setVehicle(data.data);
          setIsLoading(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token, id]);

  const loadingMessage = (
    <View>
      <ActivityIndicator size={"large"} color='red' />
      <Text style={{ textAlign: 'center' }}>Loading...</Text>
    </View>
  );

  if (!vehicle) return null;

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', marginVertical: 7, fontWeight: 'bold' }}>VehicleDetails</Text>
      {!isLoading && loadingMessage}
      <Text style={{ textAlign: 'center' }}>{vehicle.category}</Text>
      <Text style={{ textAlign: 'center', marginBottom: 5 }}>{vehicle.title}</Text>
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VehicleDetails;
