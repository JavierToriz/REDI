import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'; 
import { pathToFeed } from "./path"; 

function HomeScreen() {
  const [scrollY, setScrollY] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const placeholderImage = require("../src/images/404.jpeg");

  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  const navigation = useNavigation();

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
          return;
        }
        const url = `${pathToFeed}`;
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
        if (error.response && error.response.data && error.response.data.detail === "Parece que por ahora no hay nada que ver, pero no te preocupes, pronto te recomendaremos algo") {
          setError("Parece que por ahora no hay nada que ver, pero no te preocupes, pronto te recomendaremos algo");
        } else {
          setError(
            `No se encontraron resultados para "${path}", prueba con buscar otra cosa`
          ); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    navigation.setOptions({
      headerLargeTitle: true,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: styles.container.backgroundColor,
      },
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeHolder: "",
      },
    });
  }, [navigation]);

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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content" 
        backgroundColor="white" 
      />
      <ScrollView
        contentContainerStyle={[
          styles.containerScroll,
          { backgroundColor: scrollY > 50 ? "#f0f0f0" : "#fff" },
        ]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Descubre y disfruta de las mejores Escenas 3D
          </Text>
          <Text style={styles.bannerSubText}>
            Explora una amplia variedad de contenido, desde cultura,
            entretenimiento y conéctate con creadores de todo el mundo.
          </Text>
        </View>
        <View style={styles.videosContainer}>
          <Text style={styles.mostViewedTitle}>Los más vistos</Text>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("VisualizarEscena", {
                  path: parseInt(item.id_publication, 10),
                })
              }
            >
              <Image
                source={item.image ? getImageSource(item.image) : placeholderImage}
                style={styles.miniatura}
              />
              <View style={styles.descriptionContainer}>
                <Text style={styles.mostViewedText}>
                  {item.title ? item.title : "Título no disponible"}
                </Text>
                <Text style={styles.mostViewedSubText}>
                  {item.director ? item.director : "Director no disponible"} •{" "}
                  {item.likes ? item.likes : "0"} Likes •{" "}
                  {item.time ? item.time : "Fecha no disponible"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerScroll: {
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    margin: 20,
  },
  banner: {
    justifyContent: "center",
    height: 350,
    padding: 20,
    backgroundColor: "#01041C",
    alignItems: "center",
  },

  bannerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerSubText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  videosContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  mostViewedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  miniatura: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  mostViewedTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  mostViewedText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 6
  },
  mostViewedSubText: {
    fontSize: 12,
    color: "#666",
  },
});

export default HomeScreen;
