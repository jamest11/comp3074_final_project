import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RestaurantCard from '../common/RestaurantCard';
import styles from '../../styles';
import { useStorage } from '../StorageContextProvider';

const ListScreen = ({ navigation }) => {
  const { restaurants } = useStorage();
  return (
    <ScrollView style={[styles.container]}>
      {restaurants.map((restaurant) => (
        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
      ))}
      <StatusBar style="light" />
    </ScrollView>
  );
};

export default ListScreen;
