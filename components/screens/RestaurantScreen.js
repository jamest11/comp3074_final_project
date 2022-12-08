import { View } from 'react-native';
import styles from '../../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton, Modal, Portal, Provider, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import ChipGroup from '../common/ChipGroup';
import RatingGroup from '../common/RatingGroup';
import { useState } from 'react';
import RatingModal from '../common/RatingModal';
import { useStorage } from '../StorageContextProvider';


const RestaurantScreen = ({ route, navigation }) => {
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const {updateRestaurant} = useStorage();

  const updateRating = (rating) => {
    const data = {id: restaurant.id, rating};
    updateRestaurant(data);
    setRestaurant((prevState) => ({...prevState, ...data}));
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{restaurant.name}</Text>
      <Text>{restaurant.phone}</Text>
      <Text>{restaurant.description}</Text>
      <ChipGroup tags={restaurant.tags} />

      <View style={styles.flexGroup}>
        <RatingGroup size={36} rating={restaurant.rating} />
        <RatingModal id={restaurant.id} currentRating={restaurant.rating} updateRating={updateRating} />
      </View>

      <Text>{restaurant.address}</Text>
      <StatusBar style="light" />

    </View>
  );
};

export default RestaurantScreen;