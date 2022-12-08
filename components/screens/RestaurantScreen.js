import { View } from 'react-native';
import styles from '../../styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const RestaurantScreen = ({ route, navigation }) => {

  const restaurant = route.params.restaurant;

  return (
    <View style={[styles.container]}>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.phone}</Text>
      <Text>{restaurant.description}</Text>
      <Text>{restaurant.address}</Text>
      <StatusBar style="light" />
    </View>
  );
};

export default RestaurantScreen;