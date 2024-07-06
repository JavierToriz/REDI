import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function RegisterScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.containerScroll}>
            <Text style={styles.title}>Crea una nueva cuenta</Text>
            <Text style={styles.subtitle}>Rellena la información para crear tu cuenta</Text>
            
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            keyboardType="name-phone-pad"
            />
            <TextInput
            style={styles.input}
            placeholder="Apellidos"
            keyboardType="name-phone-pad"
            />
            <TextInput
            style={styles.input}
            placeholder="Nombre de usaurio"
            keyboardType="name-phone-pad"
            />

            <View style={styles.inputContainer}>
                <Icon name="birthday-cake" size={30} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Fecha de Nacimiento"
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="venus-mars" size={28} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Genero"
                
                />
            </View>

            <View style={styles.inputContainer}>
                <Icon name="envelope" size={28} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                />
            </View>

           <View style={styles.inputContainer}>
                <Icon name="lock" size={36} color="#007bff" style={styles.icon} />
                <TextInput  
                style={styles.input2}
                placeholder="Contraseña"
                secureTextEntry
                />
            </View>

            <TextInput
            style={styles.input}
            placeholder=" Confirmar contraseña"
            secureTextEntry
            />
            
            <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("GustosScreen")}>
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