import { Share, View } from 'react-native';
import { Button, FAB, Text, useTheme } from 'react-native-paper';
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

  const formatPhone = (phone) => {
    return `(${phone.slice(0,3)}) ${phone.slice(3, 6)} ${phone.slice(6, 10)} ${phone.slice(10)}`;
  };

  const onShare = () => {
    Share.share({
      message:
        `Check out the restaurant ${restaurant.name} at ${restaurant.address}.\n` +
        (restaurant.phone.length > 0 ? `Their phone number is ${formatPhone(restaurant.phone).trim()}.\n` : '') +
        (restaurant.rating !== 0 ? `I gave them a ${restaurant.rating}/5 rating.` : ''),
    }).catch(console.error);
  };

  return (
    <View style={styles.container}>

      <Text variant="headlineLarge">{restaurant.name}</Text>
      {restaurant.phone.length > 0  && (
        <Text
          onPress={() => Linking.openURL(`tel:${restaurant.phone}`)}
          variant="headlineSmall"
          style={{ color: theme.colors.primary, marginVertical: 16 }}
        >
          {formatPhone(restaurant.phone)}
        </Text>
      )}

      {restaurant.description.length > 0 && (
        <>
          <Text variant="labelMedium" style={{ marginTop: 12 }}>Description</Text>
          <Text variant="bodyLarge" style={{ marginBottom: 12 }}>{restaurant.description}</Text>
        </>
      )}

      {restaurant.tags.length > 0 && (
        <ChipGroup tags={restaurant.tags} />
      )}

      <View style={[styles.flexGroup, { marginTop: 12 }]}>
        <RatingGroup size={36} rating={restaurant.rating} />
        <RatingModal currentRating={restaurant.rating} updateRating={updateRating} />
      </View>

      {restaurant.address?.length > 0 && (
        <>
          <View style={[styles.flexGroup, {marginTop: 12}]}>
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
              onPress={() => {
                navigation.navigate('Map', { address: restaurant.address, title: restaurant.name });
              }}
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
      <FAB
        icon="share-variant"
        style={styles.fab}
        onPress={onShare}
        color="white"
      />
      <StatusBar style="light" />
    </View>
  );
};

export default RestaurantScreen;
