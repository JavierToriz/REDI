import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function SearchHeader() {
  const navigation = useNavigation();
  const [consulta, setConsulta] = useState("");

  const handleSearchSubmit = () => {
    if (consulta.trim() !== "") {
      navigation.navigate("QueryScreen", {
        path: consulta.trim()
      });
      setConsulta(""); // Clear the input after navigating
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Buscar"
        onChangeText={setConsulta}
        value={consulta} // Set the value to the state
        style={styles.searchInput}
        onSubmitEditing={handleSearchSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    width: 150,
    marginLeft: '18%',
    marginRight: 0,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#9b9b9b",
  },
  searchInput: {
    height: 38,
  },
});
