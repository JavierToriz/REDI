import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

function WebViewScreen({ route }) {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // Asegura que el fondo sea blanco o cualquier color que desees
    },
    webview: {
      flex: 1,
    },
  });

export default WebViewScreen;
