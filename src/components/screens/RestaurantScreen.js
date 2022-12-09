import { View } from 'react-native';
import styles from '../../styles';
import { Button, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import ChipGroup from '../common/ChipGroup';
import RatingGroup from '../common/RatingGroup';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import RatingModal from '../common/RatingModal';
import { useStorage } from '../StorageContextProvider';
import EditButton from '../common/EditButton';



const RestaurantScreen = ({ route, navigation }) => {
  const {updateRestaurant, findRestaurant, emptyRestaurant, restaurants} = useStorage();
  const [restaurant, setRestaurant] = useState(emptyRestaurant);

  const updateRating = (rating) => {
    updateRestaurant({ id: restaurant.id, rating });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <EditButton id={restaurant.id} />,
    });
  }, [navigation, restaurant]);

  useEffect(() => {
    setRestaurant(findRestaurant(route.params.id));
  }, [restaurants]);

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

      <View style={styles.flexGroup}>
        <MaterialIcons name="place" size={36} color="#0085EB"/>
        <Text variant="titleMedium" style={{flex: 1, flexWrap: 'wrap'}}>
          {restaurant.address}
          </Text>
      </View>

      <View style={styles.flexGroup}>
        <Button icon="map" mode="contained" buttonColor="#0085EB">Map</Button>
        <Button icon="directions-fork" mode="contained" buttonColor="#0085EB" style={{ marginStart: 8 }}>Map</Button>
      </View>

      <StatusBar style="light" />
    </View>
  );
};

export default RestaurantScreen;
