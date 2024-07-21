import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    SafeAreaView,
  } from "react-native";
  import React, { useState } from "react";
  import ButtonTemas from "../../src/components/buttonTemas";
  import { useNavigation } from "@react-navigation/native";
  import { pathToGustosUsuario } from "../path";
  import axios from "axios";
  import AsyncStorage from '@react-native-async-storage/async-storage';

  function GustosScreen() {
    const navigation = useNavigation();
    const [selectedThemes, setSelectedThemes] = useState([]);
  
    const handleSelectTheme = (value) => {
      setSelectedThemes((prevSelectedThemes) => {
        if (prevSelectedThemes.includes(value)) {
          return prevSelectedThemes.filter((theme) => theme !== value);
        } else {
          return [...prevSelectedThemes, value];
        }
      });
    };
  
    const handleCreateAccount = async () => {
      console.log("Temas seleccionados:", selectedThemes);
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      const url = pathToGustosUsuario;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token.value}`,
      };
      const data = {
        Deportes: selectedThemes.includes("deportes"),
        Tecnologia: selectedThemes.includes("tecnologia"),
        Viajes: selectedThemes.includes("viajes"),
        Aventura: selectedThemes.includes("aventura"),
        Educacion: selectedThemes.includes("educacion"),
        Turismo: selectedThemes.includes("turismo"),
      };
      console.log(data);
      try {
        const res = await axios.post(url, data, { headers });
        console.log("Respuesta JSON:", res.data);
        Alert.alert("Intereses registrados exitosamente");
        navigation.navigate("Tabs");
      } catch (error) {
        if (error.response) {
          console.error(
            `Error al realizar la solicitud: ${error.response.status} - ${error.response.statusText}`
          );
          console.log("Detalle del error:", error.response.data.detail);

          Alert.alert(
            error.response.data.message || "Error al registrar intereses"
          );
        } else {
          console.error(error.message);
          Alert.alert("Error al realizar la solicitud");
        }
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerScroll}>
          <Text style={styles.title}>Personaliza tus intereses</Text>
          <Text style={styles.subtitle}>
            Selecciona tus temas favoritos para recibir contenido personalizado
          </Text>
          <View style={styles.container2}>
            <ButtonTemas
              title={"Deportes"}
              backgroundColor={"#EDD820"}
              value={"deportes"}
              onPress={() => handleSelectTheme("deportes")}
            />
            <ButtonTemas
              title={"Tecnología"}
              backgroundColor={"#ED2620"}
              value={"tecnologia"}
              onPress={() => handleSelectTheme("tecnologia")}
            />
          </View>
          <View style={styles.container2}>
            <ButtonTemas
              title={"Viajes"}
              backgroundColor={"#2086ED"}
              value={"viajes"}
              onPress={() => handleSelectTheme("viajes")}
            />
            <ButtonTemas
              title={"Aventura"}
              backgroundColor={"#ED20BF"}
              value={"aventura"}
              onPress={() => handleSelectTheme("aventura")}
            />
          </View>
          <View style={styles.container2}>
            <ButtonTemas
              title={"Educación"}
              backgroundColor={"#ED9420"}
              value={"educacion"}
              onPress={() => handleSelectTheme("educacion")}
            />
            <ButtonTemas
              title={"Turismo"}
              backgroundColor={"#61C443"}
              value={"turismo"}
              onPress={() => handleSelectTheme("turismo")}
            />
          </View>
  
          <Text style={styles.title2}>Tus intereses seleccionados:</Text>
          <Text style={styles.subtitle}>
            Selecciona tus temas favoritos para recibir contenido personalizado
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    containerScroll: {
      flex: 1,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    container2: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      margin: 5,
    },
  
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    title2: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "left",
      marginTop: 20,
      marginBottom: 20,
    },
    subtitle: {
      textAlign: "center",
      marginBottom: 40,
      color: "gray",
    },
    button: {
      backgroundColor: "#6e00fa",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  
  export default GustosScreen;