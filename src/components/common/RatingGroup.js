import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../../styles';
import { useTheme } from 'react-native-paper';

const RatingGroup = ({ rating, size }) => {
  const theme = useTheme();

  return (
    <View style={ styles.flexGroup }>
      {[...Array(5)].map((e, i) => (
        <MaterialIcons name={i + 1 <= rating ? 'star': 'star-outline'} size={size} key={i} color={theme.colors.secondary} />
      ))}
    </View>
  );
};

export default RatingGroup;