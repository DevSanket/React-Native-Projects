import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion,setMapRegion] = useState({});
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
    const circumference = (40075 / 360) * 1000;

  useEffect(() => {
    (async () => {
      // if (Platform.OS === 'android' && !Device.isDevice) {
      //   setErrorMsg(
      //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      //   );
      //   return;
      // }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      setLocation(location);
      setMapRegion({
        latitude:location.coords["latitude"],
        longitude:location.coords["longitude"],
        latitudeDelta:location.coords["accuracy"] * (1 / (Math.cos(location.coords["latitude"]) * circumference)),
        longitudeDelta: (location.coords["accuracy"] / oneDegreeOfLongitudeInMeters)
      });
      // console.log(location.coords);

      // let { coords } = await Location.getCurrentPositionAsync();

      // if (coords) {
      //   const { latitude, longitude } = coords;
      //   let response = await Location.reverseGeocodeAsync({
      //     latitude,
      //     longitude,
      //   });
      //   for (let item of response) {
      //     let address = `${item.name},${item.district},${item.city},${item.subregion},${item.postalCode}`;
      //     console.log(address);
      //   }
      // }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {location && <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
