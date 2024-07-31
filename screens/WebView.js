import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { pathToWatchWebGL } from "./path";

function WebViewScreen({ route }) {
  const { path } = route.params;
  const url = pathToWatchWebGL+path+"/index.html";
  console.log(url);
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;