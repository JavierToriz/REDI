import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Card } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { pathToWatchPublication, pathToLikePublication } from "./path";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VisualizarEscena({ route }) {
  const { path } = route.params;
  console.log(path);
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItemStr = await AsyncStorage.getItem("userToken");
        const token = JSON.parse(storedItemStr);
        if(token === null){
          navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
          });
        }
        const url = `${pathToWatchPublication}/1`;
        // const url = `${pathToWatchPublication}/${path}`;
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        });
        setData(response.data);
        setLiked(response.data.liked);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error al cargar los datos.</Text>
      </View>
    );
  }

  const like = async () => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      const url = `${pathToLikePublication}/${data.publicacion}`;
      const response = await axios.post(url, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });

      setLiked(!liked);
      setData((prevData) => ({
        ...prevData,
        likes: liked ? prevData.likes - 1 : prevData.likes + 1,
      }));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLiked(!liked);
      } else {
        console.error("Error:", error);
        Alert.alert("Error", "Hubo un error al dar like.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>{
          if(data.tipo === "model"){
            navigation.navigate("WebViewScreen", {
              path: data.publicacion ? data.publicacion : "defaultPath",
            });
          }else{
            navigation.navigate("CustomScreen",{
              path: data.publicacion ? data.publicacion : "defaultPath",
            });
          }
        } 
        }
      >
        <Image
          source={{ uri: `data:image/jpeg;base64,${data.imagen}` }}
          style={styles.miniatura}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.tipo,
          data.tipo === "model" ? styles.tipoModelo : styles.tipoEscena,
        ]}
      >
        {data.tipo === "model" ? (
          <FontAwesome name="cube" size={20} color={"black"} />
        ) : (
          <FontAwesome name="film" size={20} color={"black"} />
        )}
        <Text>{data.tipo === "model" ? " Modelo" : " Escena"}</Text>
      </View>

      <Text style={styles.title}>
        {data.titulo ? data.titulo : "Título no disponible"}
      </Text>
      <View style={styles.containerB}>
        <Card.Title
          style={styles.card}
          left={(props) => (
            <Avatar.Text
              {...props}
              size={44}
              label={data.usuario ? data.usuario.substring(0, 2) : "..."}
            />
          )}
          title={data.usuario ? data.usuario : "..."}
          subtitle={
            data.seguidores ? `${data.seguidores} seguidores` : "0 seguidores"
          }
        />
        <View style={styles.containerC}>
          <FontAwesome name="eye" size={32} color={"#9b9b9b"} />
          <Text>{data.vistas ? `${data.vistas} vistas` : " 0 vistas"}</Text>
        </View>
        <View style={styles.containerC}>
          <TouchableOpacity onPress={like}>
            <FontAwesome
              name="heart"
              size={32}
              color={liked ? "red" : "#9b9b9b"}
            />
          </TouchableOpacity>
          <Text>{data.likes ? ` ${data.likes}` : " 0"}</Text>
        </View>
      </View>
      <View style={styles.descripcionContainer}>
        <Text>
          {data.contenido ? data.contenido : "Contenido no disponible"}
        </Text>
      </View>

      <View style={styles.divider}></View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ComentariosScreen", {
            path: data.publicacion ? data.publicacion : "defaultPath",
          })
        }
      >
        <Text style={styles.buttonText}>
          {data.comentarios
            ? `${data.comentarios} comentarios`
            : "0 comentarios"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tipo: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 26,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  tipoEscena: {
    backgroundColor: "#0070FF",
  },
  tipoModelo: {
    backgroundColor: "green",
  },
  miniatura: {
    height: 250,
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
  },
  containerB: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    marginLeft: 4,
  },
  card: {
    width: 200,
  },
  containerC: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  descripcionContainer: {
    padding: 20,
    backgroundColor: "#DBDDDF",
    borderRadius: 20,
    marginBottom: 20,
    width: "96%",
    marginLeft: 8,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#DBDDDF",
    marginBottom: 20,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    borderRadius: 1,
    alignItems: "center",
    backgroundColor: "#6A6BD2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
