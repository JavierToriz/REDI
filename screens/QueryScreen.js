import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { pathToBusquda } from "./path";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ route, navigation }) {
  const { path } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = require("../src/images/404.jpeg");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedItemStr = await AsyncStorage.getItem("userToken");
        const token = JSON.parse(storedItemStr);
        if (token === null) {
          navigation.reset({
            index: 0,
            routes: [{ name: "LogIn" }],
          });
        }
        const url = `${pathToBusquda}/${path}`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        });

        if (response.status === 404) {
          setError("No se encontraron resultados");
        } else {
          setData(response.data.recommendations);
        }
      } catch (error) {
        console.error(error);
        setError(
          `No se encontraron resultados para "${path}", prueba con buscar otra cosa`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  const getImageSource = (base64Image) => {
    if (!base64Image) return placeholderImage;
    return { uri: `data:image/jpeg;base64,${base64Image}` };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lo último en publicaciones sobre {path}</Text>
      <ScrollView>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("VisualizarEscena", {
                  path: parseInt(item.id_publication, 10),
                })
              }
            >
              <Image
                source={
                  item.image ? getImageSource(item.image) : placeholderImage
                }
                style={styles.image}
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              {item.title ? item.title : "Título no disponible"}
            </Text>
            <Text style={styles.details}>
              {item.director ? item.director : "Director no disponible"} •{" "}
              {item.likes ? item.likes : "0"} Likes •{" "}
              {item.time ? item.time : "Fecha no disponible"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    color: "#555",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "gray",
  },
});
