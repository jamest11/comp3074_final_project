import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import Geocoder from 'react-native-geocoding';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { GOOGLE_API_KEY } from '@env';
import styles from '../../styles';

Geocoder.init(GOOGLE_API_KEY);

const MapScreen = ({ route }) => {
  const theme = useTheme();
  const [coords, setCoords] = useState();
  const [region, setRegion] = useState();
  const [loading, setLoading] = useState(true);
  const address = route.params?.address;
  const title = route.params?.title;

  useEffect(() => {
    Geocoder.from(address)
      .then(res => {
        let loc = res.results[0].geometry.location;
        loc = { latitude: loc.lat, longitude: loc.lng };

        setCoords(loc);
        setRegion({...loc, latitudeDelta: 0.0922, longitudeDelta: 0.0421, });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator animating style={{ marginTop: 20 }} size={50} />
      ) : (
        <>
          {coords ? (
            <MapView style={styles.map} region={region}>
              <Marker coordinate={coords} title={title} ref={ref => {ref?.showCallout();}} />
            </MapView>
          ) : (
            <View style={styles.container}>
              <View style={styles.flexGroup}>
                <MaterialIcons name="info-outline" size={32} color={theme.colors.error} style={{ marginEnd: 8 }} />
                <Text variant="titleLarge" style={{flex: 1, flexWrap: 'wrap', color: theme.colors.error}}>
                  Google Maps could not locate the restaurant
                </Text>
              </View>
              <Text variant="bodyLarge" style={{ color: theme.colors.error }}>Ensure you are connected to the internet</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default MapScreen;