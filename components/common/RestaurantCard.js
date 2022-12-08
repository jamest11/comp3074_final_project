import { Button, Card, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 16 }}>
          {restaurant.tags && restaurant.tags.split(',').map((tag) => (
            <Chip style={{ marginEnd: 4 }} key={tag}>{upperFirst(tag)}</Chip>
          ))}
        </View>
        <Button onPress={handlePress}>View</Button>
      </Card.Content>
    </Card>
  );
};

export default RestaurantCard;