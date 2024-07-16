import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, Alert, SafeAreaView} from 'react-native'
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { pathToRegistroUsuario } from '../path';
import axios from 'axios';

function RegisterScreen() {
  const navigation = useNavigation();
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [username, setusername] = useState('');
  const [Nacimiento, setNacimiento] = useState('');
  const [email, seemail] = useState('');
  const [password1, setpassword1] = useState('');
  const [password2, setpassword2] = useState('');
  const [Genero, setGenero] = useState('');

  const handleRegister = async () => {
    if (password1 !== password2) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }

    const trimmedNombre = Nombre.trim();
    const apellidosArray = Apellidos.split(' ');
    if (apellidosArray.length < 2) {
      Alert.alert('Por favor, ingresa ambos apellidos');
      return;
    }

    const url = pathToRegistroUsuario;
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const data = {
      username: username.trim(),
      nombre: trimmedNombre,
      apellido_p: apellidosArray[0],
      apellido_m: apellidosArray[1],
      email: email.trim(),
      password: password1.trim()
    };
    console.log(data)
    try {
      const res = await axios.post(url, data, { headers });
      console.log("Respuesta JSON:", res.data);
      Alert.alert('Usuario registrado exitosamente');
      navigation.navigate("LogIn");
    } catch (error) {
      if (error.response) {
        console.error(`Error al realizar la solicitud: ${error.response.status} - ${error.response.statusText}`);
        Alert.alert(error.response.data.message || 'Error al registrar usuario');
      } else {
        console.error(error.message);
        Alert.alert('Error al realizar la solicitud');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.containerScroll}>
            <Text style={styles.title}>Crea una nueva cuenta</Text>
            <Text style={styles.subtitle}>Rellena la información para crear tu cuenta</Text>
            
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            keyboardType="name-phone-pad"
            value={Nombre}
            onChangeText={setNombre}
            />
            <TextInput
            style={styles.input}
            placeholder="Apellidos"
            keyboardType="name-phone-pad"
            value={Apellidos}
            onChangeText={setApellidos}
            />
            <TextInput
            style={styles.input}
            placeholder="Nombre de usaurio"
            keyboardType="name-phone-pad"
            value={username}
            onChangeText={setusername}
            />
 
            <View style={styles.inputContainer}>
                <Icon name="birthday-cake" size={30} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Fecha de Nacimiento"
                value={Nacimiento}
                onChangeText={setNacimiento}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="venus-mars" size={28} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Genero"
                value={Genero}
                onChangeText={setGenero}
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="envelope" size={28} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={seemail}
                />
            </View>

           <View style={styles.inputContainer}>
                <Icon name="lock" size={36} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Contraseña"
                secureTextEntry
                value={password1}
                onChangeText={setpassword1}
                />
            </View>

            <TextInput
            style={styles.input}
            placeholder=" Confirmar contraseña"
            secureTextEntry
            value={password2}
            onChangeText={setpassword2}
            />
            
            <TouchableOpacity style={styles.button}  onPress={handleRegister}>
                <Text style={styles.buttonText}>CONTINUAR</Text>
            </TouchableOpacity>
            
            <StatusBar style='auto'/>
      </ScrollView>
      </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',

      },
      containerScroll: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: '#fff',
        
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 50,
        flexDirection: 'row'
      },
      logo: {
          width: 80,  
          height: 50, 
          marginBottom: 20,
        },
      logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20
      },
      inputContainer: {
        flexDirection: 'row',
        
      },

      icon: {
        marginRight: 10,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
      },
      subtitle: {
        textAlign: 'center',
        marginBottom: 40,
        color: 'gray',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 30,
      },
      input2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 30,
        width: '90%',

      },
      
      button: {
        backgroundColor: '#6e00fa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      register: {
        marginTop: 40,
        textAlign: 'center',
        color: '#6e00fa',
      },
})


export default RegisterScreen;