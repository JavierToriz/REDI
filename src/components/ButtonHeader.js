//Este archivo contiene el componente del boton de notificaciones

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ButtonHeader({ icon, color }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("NotificacionesScreen")}
      style={styles.button}
    >
      <FontAwesome
        name={icon}
        size={30}
        color={color ? color : "#01041C"}
      ></FontAwesome>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    marginBottom: 10
  },
});
