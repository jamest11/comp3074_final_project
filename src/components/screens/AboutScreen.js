import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import styles from "../../styles";

const AboutScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.about]}>
      <MaterialIcons
        name="local-restaurant"
        size={96}
        color="#0097A7"
        style={{ marginTop: 20 }}
      />
      <Text variant="headlineMedium" >Restaurant Guide</Text>
      <Text variant="bodyLarge" style={{ marginBottom: 20 }}>
        Version 0.1
      </Text>

      <Text variant="headlineSmall">Team Members</Text>
      <Text variant="bodyLarge">James Tory - 101049351</Text>

      <StatusBar style="light" />
    </View>
  );
};

export default AboutScreen;