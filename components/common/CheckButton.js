import { IconButton } from 'react-native-paper';

const CheckButton = ({ onPress }) => {

  return (
    <IconButton
      icon="check"
      size={30}
      iconColor="white"
      onPress={onPress}
    />
  );
};

export default CheckButton;