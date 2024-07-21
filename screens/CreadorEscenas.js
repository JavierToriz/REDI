import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function CreadorEscenas() {
  const navigation = useNavigation();
  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor="#01041C" barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.text}>Crear una escena</Text>
        <Text style={styles.text2}>Permite el acceso a la cámara</Text>
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("CameraScreen")}
          >
            <Ionicons name="camera" size={34} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#01041C",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#01041C",
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  container2: {
    marginTop: 80,
  },
  buttonContainer: {
    backgroundColor: "#0070FF",
    marginTop: 100,
    width: 80,
    height: 80,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreadorEscenas;
