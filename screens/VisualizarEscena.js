import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { pathToWatchWebGL } from './path';

export default function VisualizarEscena() {
    
    const navigation = useNavigation();

    return (

    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('WebViewScreen', { url: pathToWatchWebGL })}>
        <Image source={require('../src/images/miniatura.jpg')} style={styles.miniatura} />
      </TouchableOpacity>
      <Text style={styles.title}> Titulo </Text>
      <View style={styles.containerB}>
        <Card.Title 
        style={styles.card}
        left={(props) => <Avatar.Text {...props} size={44} label="JT"/>} 
        title="Nombre "
        subtitle="70k seguidores"
        />
        <View style={styles.containerC}>
            <Entypo name="eye" size={34} color={'#9b9b9b'}/>
            <Text>1.2k vistas</Text>
        </View>
        <View style={styles.containerC}>
            <Entypo name="heart" size={34} color={'#9b9b9b'}/>
            <Text>1.2k</Text>
        </View>
      </View>
      <View style={styles.descripcionContainer}>
        <Text>Descripcion ... </Text>
      </View>

      <View style={styles.divider}>
      </View>

        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("ComentariosScreen")}>
            <Text style={styles.buttonText}> 100 comentarios</Text>
        </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
    },
    miniatura: {
        height: 250,
        width: '100%',
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, 
    },
    containerB: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20
    },
    card: {
        width: 200,
    },
    containerC: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    descripcionContainer: {
        padding: 20,
        backgroundColor: '#DBDDDF',
        borderRadius: 20,
        marginBottom: 20,

    },
    divider: {
        borderWidth: 1,
        borderColor: '#DBDDDF',
        marginBottom: 20
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 1,
        alignItems: 'center', 
        backgroundColor: '#6A6BD2'
    },
    buttonText: {
        
        color: '#fff',
        fontWeight: '600',
    }


  });
