import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Navigation from "../navigation";

// Importa la imagen local
const successImage = require('../src/gift/success.gif'); 

function SuccessScreen({ route, navigation }) {
  const { objetivo } = route.params;
  const handleButtonPress = () => {
    navigation.navigate("HomeScreen");
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡¡Todas las fotos se subieron correctamente!!</Text>
      <Image 
        source={successImage}
        style={styles.image}
      />
    <Text style={styles.subtitle}>Te notificaremos cuando tu {objetivo} este lista.</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>     Listo     </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#0070FF',
    marginTop: 40,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SuccessScreen;
