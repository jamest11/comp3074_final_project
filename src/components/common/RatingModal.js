import { IconButton, Modal, Portal, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '../../styles';

const RatingModal = ({ currentRating, updateRating }) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const theme = useTheme();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSave = () => {
    updateRating(rating);
    hideModal();
  };

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <View style={styles.flexGroup}>
            {[...Array(5)].map((e, i) => (
              <IconButton
                icon={i + 1 <= rating ? 'star': 'star-outline'}
                size={36}
                style={{width: 36, height: 36, marginHorizontal: 4}}
                iconColor={theme.colors.secondary}
                key={i}
                onPress={() => setRating(i + 1)}
              />
            ))}
          </View>
          <IconButton
            icon="check"
            size={36}
            style={{width:36, height: 36}}
            iconColor={theme.colors.primary}
            onPress={handleSave}
          />
          <IconButton
            icon="close"
            size={36}
            style={{width:36, height: 36}}
            iconColor={theme.colors.error}
            onPress={hideModal}
          />
        </Modal>
      </Portal>

      <IconButton
        icon="pencil"
        mode="contained"
        size={24}
        iconColor={theme.colors.secondary}
        onPress={showModal}
      />
    </View>

  );
};

export default RatingModal;
