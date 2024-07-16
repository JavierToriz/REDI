//Screen creador de escenas
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function CreadorEscenas() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crear una escena</Text>
      <Text style={styles.text2}>Permite el acceso a la camara</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CameraScreen")}
        >
          <Text style={styles.buttonText}>Camara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CreadorEscenas;
