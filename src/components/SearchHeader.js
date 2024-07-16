import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon, Entypo, FontAwesome } from "@expo/vector-icons";

export default function SearchHeader() {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="Buscar" style={styles.searchInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    width: 150,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#9b9b9b",
  },

  searchInput: {
    height: 38,
  },
});
