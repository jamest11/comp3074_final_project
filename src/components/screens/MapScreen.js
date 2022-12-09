import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import styles from '../../styles';

Geocoder.init('AIzaSyBIykz6gl4NQebgTkxuEmzXlonylu3mEXM');

const MapScreen = () => {
  const [coords, setCoords] = useState();
  const [region, setRegion] = useState();
  const marker = useRef();

  useEffect(() => {
    Geocoder.from('Toronto')
      .then(res => {
        let loc = res.results[0].geometry.location;
        loc = { latitude: loc.lat, longitude: loc.lng };

        setCoords(loc);
        setRegion({...loc, latitudeDelta: 0.0922, longitudeDelta: 0.0421, });
        marker.current?.showCallout();
      })
      .catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} region={region}>
        {coords && (<Marker coordinate={coords} title="Pizza Pizza" description="Pizza restaurant" ref={marker} />)}
      </MapView>
    </View>
  );
};

export default MapScreen;