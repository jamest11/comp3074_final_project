import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddButton = () => {
  const navigation = useNavigation();

  return (
    <IconButton
      icon="plus"
      size={30}
      iconColor="white"
      onPress={() => navigation.navigate('Add')}
    />
  );
};

export default AddButton;