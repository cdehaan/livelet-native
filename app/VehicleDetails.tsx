import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { AntDesign } from '@expo/vector-icons';

const VehicleDetails = (vehicleId: { handleVehicleId: (arg0: null) => void; vehicleId: any; }) => {

  const handleChange = (event: any) => {
    vehicleId.handleVehicleId(null);
  };

  if (!vehicleId) return null;
  console.log(vehicleId);

  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(`https://livelet-api.adamo.tech/api/vehicleItem-detail/${vehicleId.vehicleId}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('Response data:', data.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <Modal animationType='slide' transparent={false} >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => handleChange(null)}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text>VehicleDetails</Text>
      </View>


    </Modal>
  )
}

export default VehicleDetails;
