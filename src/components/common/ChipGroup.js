import { Chip } from 'react-native-paper';
import { View } from 'react-native';
import styles from '../../styles';

const ChipGroup = ({ tags }) => {
  const tagList = tags.split(',').map(t => t.trim());
  const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <View style={styles.flexGroup}>
      {tags.length > 0 && tagList.map((tag) => (
        <Chip style={{ marginEnd: 4, backgroundColor: '#E6E6E6' }} key={tag}>{upperFirst(tag)}</Chip>
      ))}
    </View>
  );
};

export default ChipGroup;