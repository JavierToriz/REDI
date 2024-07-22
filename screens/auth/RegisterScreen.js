import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { pathToRegistroUsuario } from "../path";

function RegisterScreen() {
  const navigation = useNavigation();
  const [Nombre, setNombre] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [username, setUsername] = useState("");
  const [Nacimiento, setNacimiento] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [Genero, setGenero] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = async () => {
    if (password1 !== password2) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo electrónico inválido");
      return;
    }
    const trimmedNombre = Nombre.trim();
    const apellidosArray = Apellidos.split(" ");
    if (apellidosArray.length < 2) {
      Alert.alert("Por favor, ingresa ambos apellidos");
      return;
    }

    const url = pathToRegistroUsuario;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const data = {
      username: username.trim(),
      nombre: trimmedNombre,
      apellido_p: apellidosArray[0],
      apellido_m: apellidosArray[1],
      email: email.trim(),
      password: password1.trim(),
      nacimiento: Nacimiento.toISOString(), 
      genero: Genero,
    };

    try {
      const res = await axios.post(url, data, { headers });
      console.log("Respuesta JSON:", res.data);
      Alert.alert("Usuario registrado exitosamente");
      navigation.navigate("LogIn");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          // Si el correo electrónico ya está registrado
          if (error.response.data.detail === "Email already registered") {
            Alert.alert("El correo electrónico ya está registrado");
          }
          // Si el nombre de usuario ya está registrado
          else if (error.response.data.detail === "Username already registered") {
            Alert.alert("El nombre de usuario ya está registrado");
          }
          // Otro tipo de error
          else {
            Alert.alert(error.response.data.message || "Error al registrar usuario");
          }
        } else {
          console.error(`Error al realizar la solicitud: ${status} - ${error.response.statusText}`);
          Alert.alert("Error al registrar usuario");
        }
      } else {
        console.error(error.message);
        Alert.alert("Error al realizar la solicitud");
      }
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setNacimiento(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Crea una nueva cuenta</Text>
        <Text style={styles.subtitle}>
          Rellena la información para crear tu cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={Apellidos}
          onChangeText={setApellidos}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.inputContainer}>
          <Icon
            name="birthday-cake"
            size={30}
            color="#007bff"
            style={styles.icon}
            onPress={showDatePickerHandler}
          />
          <Text style={styles.dateText}>{formatDate(Nacimiento)}</Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={Nacimiento}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            style={styles.datePicker}
          />
        )}

<View style={styles.inputContainer}>
          <Icon name="venus-mars" size={28} color="#007bff" style={styles.icon} />
          <Picker
            selectedValue={Genero}
            style={styles.picker}
            onValueChange={(itemValue) => setGenero(itemValue)}
          >
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Prefiero no decirlo" value="NoEspecificado" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password1}
          onChangeText={setPassword1}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={password2}
          onChangeText={setPassword2}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const formatDate = (date) => {
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formattedDate;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  dateText: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#6e00fa",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
