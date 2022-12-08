import { IconButton, Modal, Portal } from 'react-native-paper';
import { useState } from 'react';
import { View } from 'react-native';
import styles from '../../styles';

const RatingModal = ({ currentRating, updateRating }) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(currentRating);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSave = () => {
    updateRating(rating);
    hideModal();
  };

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.ratingModal}>
          <View style={styles.flexGroup}>
            {[...Array(5)].map((e, i) => (
              <IconButton
                icon={i + 1 <= rating ? 'star': 'star-outline'}
                size={36}
                style={{width: 36, height: 36, marginHorizontal: 4}}
                iconColor="#F8E71C"
                key={i}
                onPress={() => setRating(i + 1)}
              />
            ))}
          </View>
          <IconButton
            icon="check"
            size={36}
            style={{width:36, height: 36}}
            iconColor="green"
            onPress={handleSave}
          />
          <IconButton
            icon="close"
            size={36}
            style={{width:36, height: 36}}
            iconColor="red"
            onPress={hideModal}
          />
        </Modal>
      </Portal>

      <IconButton
        icon="pencil"
        mode="contained"
        size={24}
        iconColor="#0085EB"
        containerColor="#E6E6E6"
        onPress={showModal}
      />
    </View>

  );
};

export default RatingModal;
