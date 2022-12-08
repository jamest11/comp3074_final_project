import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const EditButton = ({ id }) => {
  const navigation = useNavigation();

  return (
    <IconButton
      icon="pencil"
      size={30}
      iconColor="white"
      onPress={() => navigation.navigate('Edit', { id })}
    />
  );
};

export default EditButton;