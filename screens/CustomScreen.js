import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVrCardboard, faMobile } from "@fortawesome/free-solid-svg-icons";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { pathToDownloadAPK } from "./path";

export default function CustomScreen({ route, navigation }) {
  const { path } = route.params;

  const WatchMobile = () => {
    console.log("Navigating to WebViewScreen with path:", path);
    navigation.navigate("WebViewScreen", { path: path });
  };

  const WatchVR = async () => {
    const url = `${pathToDownloadAPK}/${path}`;
    const fileUri = FileSystem.cacheDirectory + 'redi.apk';

    try {
      console.log("Downloading APK from URL:", url);
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log("APK downloaded to:", uri);

      if (Platform.OS === 'android') {
        // Intentar compartir el archivo APK usando expo-sharing
        console.log("Sharing APK with URI:", uri);
        await Sharing.shareAsync(uri, {
          mimeType: 'application/vnd.android.package-archive',
          dialogTitle: 'Instalar APK'
        });
      } else {
        Alert.alert("Plataforma no soportada", "Esta funcionalidad solo está disponible en Android.");
      }
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Hubo un problema al descargar el APK");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01041C" barStyle="light-content" />
      <Text style={styles.title}>Disfruta de la escena en</Text>
      <TouchableOpacity style={styles.circleButton} onPress={WatchMobile}>
        <FontAwesomeIcon icon={faMobile} size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={WatchVR}>
        <FontAwesomeIcon icon={faVrCardboard} size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01041C",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
    backgroundColor: "#0070FF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
