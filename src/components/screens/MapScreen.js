import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import styles from '../../styles';
import { Text } from 'react-native-paper';

Geocoder.init('AIzaSyBIykz6gl4NQebgTkxuEmzXlonylu3mEXM');

const MapScreen = () => {
  const [coords, setCoords] = useState();
  const [region, setRegion] = useState();

  useEffect(() => {
    Geocoder.from('Toronto')
      .then(res => {
        const loc = res.results[0].geometry.location; 
        setCoords(loc);
        setRegion({latitude: loc.lat, longitude: loc.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421,});
      })
      .catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} region={region}>
        {coords && (<Marker coordinate={{ latitude: coords.lat, longitude: coords.lng }} title="Pizza Pizza" />)}
      </MapView>
    </View>
  );
};

export default MapScreen;