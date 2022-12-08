import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import RestaurantCard from '../common/RestaurantCard';
import styles from "../../styles";
import { useStorage } from '../StorageContextProvider';
import { Button } from 'react-native-paper';


const rest = {
  name: 'Pizza Nova',
  phoneNumber: '(123) 111-1234',
  description: '',
  address: '',
  tags: 'pizza,takeout',
  rating: 4
};

const ListScreen = ({ navigation }) => {
  const {restaurants} = useStorage();

  return(
    <ScrollView style={[styles.container]}>
      <RestaurantCard restaurant={rest} navigation={navigation} />

      {restaurants.map(restaurant => (
        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
      ))}
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default ListScreen;