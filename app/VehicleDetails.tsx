import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { AntDesign } from '@expo/vector-icons';

const VehicleDetails = ({ vehicleId, handleVehicleId }: { vehicleId: number, handleVehicleId: any }) => {
  const { token, setToken } = useContext(UserContext);
  const [vehicle, setVehicle] = useState([]);

  const handleChange = () => {
    handleVehicleId(null);
  };

  if (!vehicleId) return null;
  console.log(vehicleId);


  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(`https://livelet-api.adamo.tech/api/vehicleItem-detail/${vehicleId}/`, {
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
        <Text style={{ textAlign: 'center', marginVertical: 5 }}>VehicleDetails</Text>
        <Text>{vehicle.category}</Text>
        <Text>{vehicle.title}</Text>
      </View>


    </Modal>
  )
}

export default VehicleDetails;
