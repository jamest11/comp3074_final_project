import { Button, Card, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChipGroup from './ChipGroup';


const RestaurantCard = ({ restaurant }) => {
  const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.setOptions({ })
    navigation.navigate('View', { restaurant: restaurant });
  }

  return (
    <Card style={{ marginBottom: 8 }}>
      <Card.Title title={restaurant.name} titleVariant="titleLarge" />
      <Card.Content>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {[...Array(restaurant.rating)].map((e, i) => (
            <MaterialIcons name="star" size={24} key={i} />
          ))}
        </View>
        <ChipGroup tags={restaurant.tags} />
        <Button onPress={handlePress}>View</Button>
      </Card.Content>
    </Card>
  );
};

export default RestaurantCard;