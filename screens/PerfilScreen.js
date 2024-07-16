import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, StatusBar, FlatList, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ImageGrid from '../src/components/ImageGrid'



export default function PerfilScreen() {

    const escenas = [
        {id: '1', source: require('../src/images/miniatura.jpg') },
        { id: '2', source: require('../src/images/miniatura.jpg') },
        { id: '3', source: require('../src/images/miniatura.jpg') },
        { id: '4', source: require('../src/images/miniatura.jpg') },
        { id: '5', source: require('../src/images/miniatura.jpg') },
        { id: '6', source: require('../src/images/miniatura.jpg') },
        { id: '7', source: require('../src/images/miniatura.jpg') },
        { id: '8', source: require('../src/images/miniatura.jpg') },
        { id: '9', source: require('../src/images/miniatura.jpg') },
      ];

  return (
    
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.header} />
            <View style={styles.profileContent}>
                <Image
                source={ require( '../src/images/miniatura.jpg')} // Ruta de la imagen
                style={styles.profileImage}
                />
                <Text style={styles.profileName}>Javier Toriz</Text>
                <Text style={styles.profileDescription}>
                Apasionado por la naturaleza, la ciencia ficción y por la vida al aire libre.
                </Text>
            </View>
            <View style={styles.numbersContent}>
                <View style={styles.numbersItem}>
                    <Text style={styles.profileName}>0</Text>
                    <Text style={styles.profileDescription}>Publicaciones</Text>
                </View>
                <View style={styles.numbersItem}>
                    <Text style={styles.profileName}>0</Text>
                    <Text style={styles.profileDescription}>Seguidores</Text>
                </View>
                <View style={styles.numbersItem}>
                    <Text style={styles.profileName}>0</Text>
                    <Text style={styles.profileDescription}>Seguidos</Text>
                </View>
            </View>
            <View style={styles.imageContent}>
            {escenas.map((item) => (
        <View key={item.id} style={styles.imageContainer}>
          <Image source={item.source} style={styles.image} />
        </View>
      ))}
            </View>
            </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
  },
    containerScroll: {
    backgroundColor: '#FFFFFF',
    },
    header: {
        width: '100%',
        height: 170,
        backgroundColor: '#6A1B9A',
      },
      profileContent: {
        alignItems: 'center',
        marginTop: -50, // Para que la imagen se superponga al header
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
      },
      profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
      },
      profileDescription: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 10
      },
      numbersContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 25
      },
      numbersItem: {
        alignItems: 'center',
        justifyContent: 'center',
      },

      imageContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20
      },
      imageContainer: {
        width: Dimensions.get('window').width / 3 - 10, // Dividir el ancho entre el número de columnas menos el margen
        height: Dimensions.get('window').width / 3 - 10, // Hacer la altura igual al ancho para que las imágenes sean cuadradas
        margin: 5,
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 1,
      },
      
});