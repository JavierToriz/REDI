import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function ImageDetailScreen({ route }) {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageDetailScreen;
