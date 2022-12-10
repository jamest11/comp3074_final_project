import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import ChipGroup from '../common/ChipGroup';
import RatingGroup from '../common/RatingGroup';
import styles from '../../styles';
import RatingModal from '../common/RatingModal';
import { useStorage } from '../StorageContextProvider';
import EditButton from '../common/EditButton';

const RestaurantScreen = ({ route, navigation }) => {
  const { updateRestaurant, findRestaurant, emptyRestaurant, restaurants } = useStorage();
  const [restaurant, setRestaurant] = useState(emptyRestaurant);
  const theme = useTheme();

  const updateRating = (rating) => {
    updateRestaurant({ id: restaurant.id, rating });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <EditButton id={restaurant.id} />,
    });
  }, [navigation, restaurant]);

  useEffect(() => {
    setRestaurant(findRestaurant(route.params?.id));
  }, [restaurants]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{restaurant.name}</Text>
      <Text>{restaurant.phone}</Text>
      <Text>{restaurant.description}</Text>
      <ChipGroup tags={restaurant.tags} />

      <View style={styles.flexGroup}>
        <RatingGroup size={36} rating={restaurant.rating} />
        <RatingModal currentRating={restaurant.rating} updateRating={updateRating} />
      </View>

      {restaurant.address?.length > 0 && (
        <>
          <View style={styles.flexGroup}>
            <MaterialIcons name="place" size={36} color={theme.colors.secondary} />
            <Text variant="titleMedium" style={{ flex: 1, flexWrap: 'wrap' }}>
              {restaurant.address}
            </Text>
          </View>

          <View style={styles.flexGroup}>
            <Button
              icon="map"
              mode="contained"
              buttonColor={theme.colors.secondary}
              onPress={() => navigation.navigate('Map', { address: restaurant.address })}
            >
              Map
            </Button>
            <Button
              icon="directions-fork"
              mode="contained"
              buttonColor={theme.colors.secondary}
              style={{ marginStart: 8 }}
              onPress={() => {
                Linking.openURL("geo:0,0?q=" + encodeURI(restaurant.address)).catch(console.error);
              }}
            >
              Directions
            </Button>
          </View>
        </>
      )}

      <StatusBar style="light" />
    </View>
  );
};

export default RestaurantScreen;
