import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Button, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const VehicleDetails = ({ vehicleId }: { vehicleId: number }) => {
  // const VehicleDetails = ({ vehicleId, setVehicleId }: { vehicleId: number, setVehicleId: any }) => {
  const { token } = useContext(UserContext);
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // if (!vehicleId) return null;
  // console.log(vehicleId);


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
          setIsLoading(true);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const loadingMessage = (
    <View>
      <ActivityIndicator size={"large"} color='red' />
      <Text style={{ textAlign: 'center' }}>Loading...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => { setVehicleId(null) }} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity> */}
      <Text style={{ textAlign: 'center', marginVertical: 7, fontWeight: 'bold' }}>VehicleDetails</Text>
      {!isLoading && loadingMessage}
      <Text style={{ textAlign: 'center' }}>{vehicle.category}</Text>
      <Text style={{ textAlign: 'center', marginBottom: 5 }}>{vehicle.title}</Text>
      <Button title="Back" onPress={() => router.back()} />
    </View>

    // <Modal animationType='slide' transparent={true} >
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', }}>
    //     <View style={{ width: "70%", borderColor: "#888", borderWidth: 1, padding: 7, borderRadius: 12, backgroundColor: 'white' }}>
    //       <TouchableOpacity onPress={() => {setVehicleId(null)}} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
    //         <AntDesign name="close" size={24} color="black" />
    //       </TouchableOpacity>
    //       <Text style={{ textAlign: 'center', marginVertical: 7, fontWeight: 'bold' }}>VehicleDetails</Text>
    //       {!isLoading && loadingMessage}
    //       <Text style={{ textAlign: 'center' }}>{vehicle.category}</Text>
    //       <Text style={{ textAlign: 'center', marginBottom: 5 }}>{vehicle.title}</Text>
    //     </View>
    //   </View>
    // </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VehicleDetails;
