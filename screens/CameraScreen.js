import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import {
  useCameraPermissions,
  CameraView,
  Camera,
  CameraType,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonCamera from "../src/components/buttonCamera";

function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState("off");
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
    console.log(facing);
  }
  function flashFunction() {
    setFlash((current) => (current === "off" ? "on" : "off"));
    console.log(flash);
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.url);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBotones}>
        <ButtonCamera title={"Flash"} icon="camera" onPress={flashFunction} />
      </View>

      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        ref={cameraRef}
      ></CameraView>
      <View>
        <ButtonCamera
          title={"Girar"}
          icon="camera"
          onPress={toggleCameraFacing}
        />
        <ButtonCamera
          title={"Tomar foto"}
          icon="camera"
          onPress={takePicture}
        />
        <ButtonCamera title={"Flash"} icon="camera" onPress={flashFunction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 15,
  },
  containerBotones: {
    padding: 8,
    marginTop: 20,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
});

export default CameraScreen;
