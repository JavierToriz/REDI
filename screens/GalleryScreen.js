import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Importa FontAwesome
import { pathUploadFotos, pathToPublicationForAdminNewPublication } from "./path";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

function GalleryScreen({ route, navigation }) {
  const { imageUris } = route.params;
  const [mode, setMode] = useState("Modelo"); // Estado para el modo seleccionado
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga

  // Estado para el interruptor
  const [isModel, setIsModel] = useState(true);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ImageDetailScreen", { uri: item })}
    >
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const handleSwitchToggle = (value) => {
    setIsModel(value);
  };

  const sendNotification = async (id) => {
    const url = pathToPublicationForAdminNewPublication;
    const storedItemStr = await AsyncStorage.getItem("userToken");
    const token = JSON.parse(storedItemStr);
    if(token === null){
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    }
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token.value}`,
    };
    const data = {
      id_path_fotos: Math.floor(id),
    };
  
    try {
      const res = await axios.post(url, data, { headers });
      console.log("Respuesta completa:", res);
      console.log("Respuesta JSON:", res.data);
      console.log("Status:", res.status);
      console.log("Headers:", res.headers);
  
      Alert.alert("Notificación enviada exitosamente");
    } catch (error) {
      if (error.response) {

        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      } else if (error.request) {
        console.error("Error request data:", error.request);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      } else {
        console.error("Error message:", error.message);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      Alert.alert("Error al notificar");
    }
  }

  const handleActionButtonPress = async () => {
    setIsLoading(true); // Mostrar el indicador de carga
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      const formData = new FormData();
      const objetivo = mode === "Modelo" ? "model" : "scene";
      const url = `${pathUploadFotos}/${objetivo}`;

      imageUris.forEach((uri) => {
        const name = uri.split('/').pop();
        formData.append('photos', {
          uri,
          type: 'image/jpeg',
          name,
        });
      });

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      if (response.status === 200) {
        sendNotification(response.data.id);
        navigation.navigate("SuccessScreen", { objetivo });
      } else {
        Alert.alert("Error", `No se pudieron subir las fotos: ${response.statusText}`);
      }
    } catch (error) {
      Alert.alert("Error", `Error al subir fotos: ${error.message}`);
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prepara tus fotos</Text>
      <FlatList
        data={imageUris}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
      />

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, mode === "Modelo" && styles.activeSwitch]}
          onPress={() => setMode("Modelo")}
        >
          <Text style={styles.switchText}>Modelo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, mode === "Escena" && styles.activeSwitch]}
          onPress={() => setMode("Escena")}
        >
          <Text style={styles.switchText}>Escena</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          disabled={isLoading} // Deshabilitar el botón si está cargando
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleActionButtonPress}
          disabled={isLoading} // Deshabilitar el botón si está cargando
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" style={styles.indicator} />
          ) : (
            <>
              <Text style={styles.buttonText}>Enviar</Text>
              <FontAwesome name="arrow-right" size={24} color="white" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center"
  },
  thumbnail: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  switchButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  activeSwitch: {
    backgroundColor: "#0070FF",
  },
  switchText: {
    color: "#fff",
    fontSize: 16,
  },
  switchButtonText: {
    fontSize: 18,
    color: "#333",
  },
  activeSwitchButtonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0070FF",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 16,
  },
  indicator: {
    paddingHorizontal: 10,
  },
});

export default GalleryScreen;
