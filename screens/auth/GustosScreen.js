import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import ButtonTemas from '../../src/components/buttonTemas';
import { useNavigation } from '@react-navigation/native';


function GustosScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Text style={styles.title}>Personaliza tus intereses</Text>
      <Text style={styles.subtitle}>Selecciona tus temas favoritos para recibir contenido personalizado</Text>
      <View style={styles.container2}>
      <ButtonTemas title={'Deportes'} backgroundColor={'#EDD820'} value={'deportes'} />
      <ButtonTemas title={'Tecnología'} backgroundColor={'#ED2620'} value={''}/>
      </View>
      <View style={styles.container2}>
      <ButtonTemas title={'Viajes'} backgroundColor={'#2086ED'} value={''}/>
      <ButtonTemas title={'Aventura'} backgroundColor={'#ED20BF'} value={''}/>
      </View>
      <View style={styles.container2}>
      <ButtonTemas title={'Educación'} backgroundColor={'#ED9420'} value={''}/>
      <ButtonTemas title={'Turismo'} backgroundColor={'#61C443'} value={''}/>
      </View>

      <Text style={styles.title2}>Tus intereses seleccionados:</Text>
      <Text style={styles.subtitle}>Selecciona tus temas favoritos para recibir contenido personalizado</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("Tabs")}>
            <Text style={styles.buttonText}>CREAR CUENTA</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',

},
containerScroll: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    
    },
    container2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 5
    
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        },
    title2: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
        },
    subtitle: {
        textAlign: 'center',
        marginBottom: 40,
        color: 'gray',
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
});

export default GustosScreen;