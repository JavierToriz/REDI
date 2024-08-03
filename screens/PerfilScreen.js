import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pathToMyProfile, pathMyFollowers, pathMyPublicaciones } from "./path";
import { useFocusEffect } from "@react-navigation/native";

export default function PerfilScreen() {
  const [dataUser, setDataUser] = useState(null);
  const [dataFollowers, setDataFollowers] = useState(null);
  const [dataPublicaciones, setDataPublicaciones] = useState(null);
  const [numberOfScenes, setNumberOfScenes] = useState(0);

  const fetchProfileData = async () => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      if (!storedItemStr) throw new Error("No token found");

      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      const [profileResponse, followersResponse, publicacionesResponse] = await Promise.all([
        axios.get(pathToMyProfile, {
          headers: { Authorization: `Bearer ${token.value}` },
        }),
        axios.get(pathMyFollowers, {
          headers: { Authorization: `Bearer ${token.value}` },
        }),
        axios.get(pathMyPublicaciones, {
          headers: { Authorization: `Bearer ${token.value}` },
        }),
      ]);

      setDataUser(profileResponse.data);
      setDataFollowers(followersResponse.data);
      setDataPublicaciones(publicacionesResponse.data);

      // Verifica si publicacionesResponse.data.publicaciones es un número válido
      setNumberOfScenes(publicacionesResponse.data.publicaciones.length || 0);
      
      console.log(profileResponse.data);
      console.log(followersResponse.data);
      console.log(publicacionesResponse.data);

    } catch (error) {
      console.error("Error fetching profile data:", error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [])
  );

  // Convertir Base64 a URL de datos
  const getImageSource = (base64Image) => {
    return `data:image/jpeg;base64,${base64Image}`;
  };

  // Actualizar `escenas` para reflejar el número obtenido
  const escenas = dataPublicaciones?.publicaciones?.map((pub) => ({
    id: pub.id.toString(),
    source: getImageSource(pub.imagen),
  })) || [];

  const getProfileImage = () => {
    if (!dataUser) return require("../src/images/miniatura.jpg"); // Imagen por defecto si no hay datos

    switch (dataUser.usuario.genero) {
      case 'Masculino':
        return require("../src/images/miniatura.jpg"); // Imagen para masculino
      case 'Femenino':
        return require("../src/images/images.jpeg"); // Imagen para femenino
      default:
        return require("../src/images/miniatura.jpg"); // Imagen por defecto
    }
  };

  if (!dataUser || !dataFollowers || !dataPublicaciones) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.header} />
        <View style={styles.profileContent}>
          <Image
            source={getProfileImage()}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{dataUser.usuario.username || "Usuario"}</Text>
          <Text style={styles.profileDescription}>
            {dataUser.description || "Apasionado por la naturaleza, la ciencia ficción y por la vida al aire libre."}
          </Text>
        </View>
        <View style={styles.numbersContent}>
          <View style={styles.numbersItem}>
            <Text style={styles.profileName}>{dataPublicaciones.publicaciones.length || 0}</Text>
            <Text style={styles.profileDescription}>Publicaciones</Text>
          </View>
          <View style={styles.numbersItem}>
            <Text style={styles.profileName}>{dataFollowers.followers || 0}</Text>
            <Text style={styles.profileDescription}>Seguidores</Text>
          </View>
          <View style={styles.numbersItem}>
            <Text style={styles.profileName}>{dataFollowers.myFollows || 0}</Text>
            <Text style={styles.profileDescription}>Seguidos</Text>
          </View>
        </View>
        <View style={styles.imageContent}>
          {escenas.map((item) => (
            <View key={item.id} style={styles.imageContainer}>
              <Image source={{ uri: item.source }} style={styles.image} />
            </View>
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
  header: {
    width: "100%",
    height: 170,
    backgroundColor: "#6A1B9A",
  },
  profileContent: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileDescription: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  numbersContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 25,
  },
  numbersItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
  },
  imageContainer: {
    width: Dimensions.get("window").width / 3 - 10,
    height: Dimensions.get("window").width / 3 - 10,
    margin: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
