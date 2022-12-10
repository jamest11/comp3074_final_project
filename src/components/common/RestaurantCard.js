import { Card, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChipGroup from './ChipGroup';


const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handlePress = () => {
    navigation.setOptions({ });
    navigation.navigate('View', { id: restaurant.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card style={{ marginBottom: 8 }}>
        <Card.Title title={restaurant.name} titleVariant="titleLarge" />
        <Card.Content>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {[...Array(restaurant.rating)].map((e, i) => (
              <MaterialIcons name="star" size={30} key={i} color={theme.colors.secondary} />
            ))}
          </View>
          <ChipGroup tags={restaurant.tags} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default RestaurantCard;