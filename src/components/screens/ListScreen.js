import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RestaurantCard from '../common/RestaurantCard';
import styles from '../../styles';
import { useStorage } from '../StorageContextProvider';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ListScreen = ({ navigation }) => {
  const { restaurants } = useStorage();

  return (
    <ScrollView style={[styles.container]}>
      { restaurants.length > 0 ?
        restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))
     : (
        <View style={styles.flexGroup}>
          <MaterialIcons name="info-outline" size={28} color="black" style={{ marginEnd: 8 }} />
          <Text variant="bodyLarge" style={{ flex: 1 }}>Add a restaurant to the guide by pressing the plus button in the top right</Text>
        </View>
      ) }

      <StatusBar style="light" />
    </ScrollView>
  );
};

export default ListScreen;
