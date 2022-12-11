import { useEffect, useState } from 'react';
import { Button, IconButton, Modal, Portal, Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../../styles';
import { useNavigation } from '@react-navigation/native';
import { useStorage } from '../StorageContextProvider';

const DeleteModal = ({ id }) => {
  const navigation = useNavigation();
  const { deleteRestaurant } = useStorage();
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleDelete = () => {
    deleteRestaurant(id);
    hideModal();
    navigation.pop(2);
  };

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={[styles.modal, { width: 240 }]}>
          <View style={styles.flexGroup}>
            <Text variant="bodyLarge">Are you sure?</Text>
            <IconButton
              icon="check"
              size={36}
              style={{width:36, height: 36}}
              iconColor={theme.colors.primary}
              onPress={handleDelete}
            />
            <IconButton
              icon="close"
              size={36}
              style={{width:36, height: 36}}
              iconColor={theme.colors.error}
              onPress={hideModal}
            />
          </View>
        </Modal>
      </Portal>

      <Button mode="outlined" onPress={showModal} style={{ marginTop: 8}} textColor={theme.colors.error}>DELETE</Button>
    </View>

  );
};

export default DeleteModal;