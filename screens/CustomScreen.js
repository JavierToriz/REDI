import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';

export default function CustomScreen({ route }) {
  const { path } = route.params;
  
  const WatchMobile = async () => {
     console.log(path);
  }

  const WatchVR = async () => {
     console.log(path);
  }

  return (
    <View style={styles.container}>
          <StatusBar backgroundColor="#01041C" barStyle="light-content" />
      <Text style={styles.title}>Disfruta de la escena en</Text>
      <TouchableOpacity style={styles.circleButton} onPress={WatchMobile}>
        <FontAwesomeIcon icon={faMobile} size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={WatchVR}>
        <FontAwesomeIcon icon={faVrCardboard} size={40} color="white"  bounce/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01041C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
    backgroundColor: '#0070FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
