import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { pathToEditPublication, pathToGenerateWordsKey } from "./path";

export default function CreatePublication({ route, navigation }) {
  const { notification } = route.params;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedKeywords, setDisplayedKeywords] = useState("");

  // console.log("Notificacion:", notification);

  const simulateTyping = (text, interval = 100) => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedKeywords(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(typingInterval);
      }
    }, interval);
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permiso de galería:", permissionResult);

    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso Denegado",
        "Se requiere permiso para acceder a la galería."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0]?.uri;
      console.log("URI de la imagen:", imageUri);
      if (imageUri) {
        setImageUri(imageUri);
      }
    } else {
      console.log("Selección de imagen cancelada");
    }
  };

  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = () => {
        reject(new Error("Error converting Blob to Base64"));
      };
      reader.readAsDataURL(blob);
    });
  };

  const watchPublication = () => {
    if (notification.tipo == "model") {
      navigation.navigate("WebViewScreen", { path: notification.carga.value });
    } else {
      Alert.alert("Que buena escena");
    }
  };

  const generateWords = async () => {
    setIsLoading(true); // Activar indicador de carga
    try {
      const data = {
        titulo: titulo,
      };

      const response = await axios.post(pathToGenerateWordsKey, data);
      const generatedKeywords = response.data.response; 
      setPalabrasClave(response.data.response); 
      simulateTyping(generatedKeywords); 
      console.log("Response:", palabrasClave);

    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Hubo un error al generar las palabras clave. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false); // Desactivar indicador de carga
    }
  }

  const handleContinuar = async () => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      // Convertir la imagen a base64
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1]; // Obtener la parte base64

        const data = {
          id: String(notification.carga.value),
          titulo: titulo,
          palabrasClave: palabrasClave,
          imagen: base64data,
          contenido: descripcion,
        };

        console.log("Datos para enviar:", data);

        try {
          const response = await axios.post(pathToEditPublication, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.value}`,
            },
          });
          console.log("Response:", response.data);
          const objetivo = notification.tipo === "model" ? "Modelo" : "Escena";
          navigation.navigate("PublicationSucces", { objetivo });
        } catch (error) {
          console.error("Error:", error);
          if (error.response) {
            console.log("Error response data:", error.response.data);
            console.log("Error response status:", error.response.status);
            console.log("Error response headers:", error.response.headers);
          }
          Alert.alert(
            "Error",
            "Hubo un error al crear tu publicación. Por favor, intenta de nuevo."
          );
          navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
          });
        }
      };
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        "Hubo un error al crear tu publicación. Por favor, intenta de nuevo."
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Agregar detalles</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleImagePicker}
        >
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imageButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Añade un título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Agregar descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <View style={styles.keywordSection}>
        <Text style={styles.keywordHeader}>Agrega palabras clave</Text>
        <Text style={styles.keywordSubheader}>
          Las palabras clave son útiles para que otras personas encuentren tu
          contenido con mayor facilidad.
        </Text>
        <TextInput
          style={styles.keywordInput}
          placeholder="Agrega palabras clave"
          value={displayedKeywords}
          onChangeText={setPalabrasClave}
        />
      </View>
      <TouchableOpacity style={styles.llama} onPress={generateWords} disabled={isLoading}>
        <Text style={styles.continueButtonText}>
          Generar palabras clave con IA{" "}
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Icon name="magic" size={20} color="#000" />
          )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.view} onPress={watchPublication}>
        <Text style={styles.continueButtonText}>
          Hechale un vistazo a tu{" "}
          {notification.tipo === "scene" ? "escena" : "modelo"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
        <Text style={styles.continueButtonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    height: 220,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageButton: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imageButtonText: {
    fontSize: 48,
    color: "#CCCCCC",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  keywordSection: {
    marginBottom: 20,
  },
  keywordHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  keywordSubheader: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 10,
  },
  keywordInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  llama: {
    backgroundColor: "#A623E3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  view: {
    backgroundColor: "#08D267",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
