import { useState } from 'react';
import { Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { useStorage } from '../StorageContextProvider';

const DeleteDialog = ({ id }) => {
  const navigation = useNavigation();
  const { deleteRestaurant } = useStorage();
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleDelete = () => {
    deleteRestaurant(id);
    hideDialog();
    navigation.pop(2);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyLarge">Are you sure you want to delete this restaurant?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <IconButton
        icon="delete-alert"
        size={30}
        iconColor="white"
        onPress={showDialog}
      />
    </View>

  );
};

export default DeleteDialog;