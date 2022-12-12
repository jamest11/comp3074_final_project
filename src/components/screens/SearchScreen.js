import { ScrollView, View } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import RestaurantCard from '../common/RestaurantCard';
import { useStorage } from '../StorageContextProvider';
import styles from '../../styles';

const SearchScreen = () => {
  const { restaurants } = useStorage();
  const [filteredRest, setFilteredRest] = useState([]);
  const [mode, setMode] = useState('name');
  const [message, setMessage] = useState('');
  const query = useRef('');
  const searchInput = useRef();

  const handleSearch = () => {
    if(query.current.length === 0) {
      return;
    }

    const result = [];

    if(mode === 'name') {
      restaurants.forEach(r => {
        if(r.name.toLowerCase().includes(query.current.toLowerCase())) {
          result.push(r);
        }
      });
    }
    else if(mode === 'tags') {
      restaurants.forEach(r => {
        if(r.tags.toLowerCase().includes(query.current.toLowerCase())) {
          result.push(r);
        }
      });
    }
    else {
      restaurants.forEach(r => {
        if(r.name.toLowerCase().includes(query.current.toLowerCase()) ||
            r.tags.toLowerCase().includes(query.current.toLowerCase())) {
          result.push(r);
        }
      });
    }
    if(result.length > 0) {
      result.sort((a, b) => a.name > b.name);
      setFilteredRest(result);
    }
    else {
      setFilteredRest([]);
      setMessage('No results found');
    }
    searchInput.current?.blur();
  };

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={newValue => setMode(newValue)} value={mode}>
        <View style={[styles.flexGroup, { marginTop: 0 }]}>
          <View style={[styles.flexGroup, { marginEnd: 8}]}>
            <Text>Name</Text>
            <RadioButton value="name" />
          </View>
          <View style={[styles.flexGroup, { marginEnd: 8}]}>
            <Text>Tags</Text>
            <RadioButton value="tags" />
          </View>
          <View style={styles.flexGroup}>
            <Text>Both</Text>
            <RadioButton value="both" />
          </View>
        </View>
      </RadioButton.Group >

      <TextInput
        label="Search"
        right={<TextInput.Icon icon="magnify" onPress={handleSearch} />}
        style={styles.textInput}
        onChangeText={(text) => { query.current = text; }}
        ref={searchInput}
      />

      {filteredRest.length === 0 && message ? (
        <View style={styles.flexGroup}>
          <MaterialIcons name="info-outline" size={32} color="black" style={{ marginEnd: 8 }} />
          <Text variant="headlineSmall">{message}</Text>
        </View>
      ) : (
        <ScrollView>
          {filteredRest.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </ScrollView>
      )}

      <StatusBar style="light" />
    </View>
  );
};

export default SearchScreen;