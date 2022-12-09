import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../styles';

const RatingGroup = ({ rating, size }) => {
  return (
    <View style={ styles.flexGroup }>
      {rating === 0 ?
        [...Array(5)].map((e, i) => (
          <MaterialIcons name="star-outline" size={size} key={i} color="#F8E71C" />
        )
      ) : [...Array(5)].map((e, i) => (
        <MaterialIcons name={i + 1 <= rating ? 'star': 'star-outline'} size={size} key={i} color="#F8E71C" />
      ))}
    </View>
  );
};

export default RatingGroup;