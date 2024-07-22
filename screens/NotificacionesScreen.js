import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pathToMyNotifications } from "./path";

export default function NotificacionesScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationPress = (notification) => {
    // navigation.navigate('NotificationDetail', { notification });
    console.log(notification.tipo);

    if(notification.tipo == "scene" || notification.tipo == "model"){
      navigation.navigate('CreatePublication', { notification });
    }
  };

  const fetchNotifications = async () => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      const response = await axios.get(pathToMyNotifications, {
        params: {
          skip: 0,
          limit: 10,
        },
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      if (response.data.status === 'success') {
        // Ordenar notificaciones por fecha de envío (más reciente primero)
        const sortedNotifications = response.data.notifications.sort((a, b) => 
          new Date(b.fecha_envio) - new Date(a.fecha_envio)
        );

        setNotifications(sortedNotifications);
      } else {
        console.error("Error en la respuesta:", response.data);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      setError("Error al obtener las notificaciones.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {notifications.map((notification) => (
        <TouchableOpacity key={notification.id} style={styles.itemContainer} onPress={() => handleNotificationPress(notification)}>
        <View style={styles.textContainer}>
          <Text style={styles.textType}>Tipo: {notification.tipo}</Text>
          <Text style={styles.textMessage}>{notification.mensaje}</Text>
          <Text style={styles.textDate}>{new Date(notification.fecha_envio).toLocaleString()}</Text>
        </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingVertical: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  textMessage: {
    fontSize: 16,
    fontWeight: "500",
  },
  textDate: {
    fontSize: 14,
    color: "#333333",
  },
  textType: {
    fontSize: 18,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
