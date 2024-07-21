import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  useCameraPermissions,
  CameraView,
} from "expo-camera";
import * as FileSystem from "expo-file-system";
import ButtonCamera from "../src/components/buttonCamera";
import { useNavigation } from "@react-navigation/native";

function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState("off");
  const [imageCount, setImageCount] = useState(0);
  const [imageUris, setImageUris] = useState([]); // New state for image URIs
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitas dar permisos para acceder a tu cámara.
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const saveImage = async (uri) => {
    try {
      // Define the directory and file path
      const directoryUri = `${FileSystem.documentDirectory}photos/`;
      const fileUri = `${directoryUri}${Date.now()}.jpg`;

      // Create the directory if it does not exist
      await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });

      // Move the file to the new location
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      console.log("Image saved to:", fileUri);
      return fileUri;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        const savedImageUri = await saveImage(data.uri);
        setImage(savedImageUri);
        setImageCount(imageCount + 1);
        setImageUris((prevUris) => [...prevUris, savedImageUri]); // Update image URIs
      } catch (e) {
        console.log(e);
      }
    }
  };

  const openGallery = () => {
    navigation.navigate('GalleryScreen', { imageUris }); // Navigate to gallery screen with image URIs
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content" // Letras negras
        backgroundColor="white" // Fondo blanco
      />
      <View style={styles.containerBotones}>
        <ButtonCamera
          icon="cross"
          size={34}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        ref={cameraRef}
      >
        <ButtonCamera
          title={"Girar"}
          icon="cycle"
          onPress={() => setFacing(facing === "back" ? "front" : "back")}
        />
        <ButtonCamera
          title={"Tomar foto"}
          icon="camera"
          onPress={takePicture}
        />
      </CameraView>
      <View style={styles.preview}>
        <ButtonCamera size={40} icon="circle" onPress={takePicture} />
        <View style={styles.preview2}>
          <Text style={styles.counter}>Número de fotos: {imageCount}</Text>
          {image && (
            <TouchableOpacity onPress={openGallery}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  containerBotones: {
    padding: 10,
    marginTop: 0,
    alignItems: "flex-end",
    backgroundColor: "white",
  },
  preview: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  preview2: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 0,
  },
  image: {
    width: 80,
    height: 80,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 5
  },
  camera: {
    flex: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  counter: {
    fontSize: 16,
    color: "black",
  },
});

export default CameraScreen;
