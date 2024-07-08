import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet,ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function HomeScreen()  {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: styles.container.backgroundColor,
      },
      headerLargeTitle: true,
      headerSearchBarOptions: {
        placeHolder: "" 
      }
    });
  }, [navigation]);


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={[styles.containerScroll, { backgroundColor: scrollY > 50 ? '#f0f0f0' : '#fff' }]}
    onScroll={handleScroll}
    scrollEventThrottle={16}> 
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Descubre y disfruta de las mejores Escenas 3D</Text>
        <Text style={styles.bannerSubText}>
            Explora una amplia variedad de contenido, desde cultura, entretenimiento y conéctate con creadores de todo el mundo.
        </Text>
      </View>
      <View style={styles.videosContainer}>
          <Text style={styles.mostViewedTitle}>Los más vistos</Text>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("VisualizarEscena")}>
            <Image source={ require( '../src/images/miniatura.jpg')} style={styles.miniatura} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.mostViewedText}>Recorrido Virtual por París</Text>
              <Text style={styles.mostViewedSubText}>Javier - 8.3k Vistas - hace 24hrs</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            <Image source={ require( '../src/images/miniatura.jpg')} style={styles.miniatura} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.mostViewedText}>Recorrido Virtual por París</Text>
              <Text style={styles.mostViewedSubText}>Javier - 8.3k Vistas - hace 24hrs</Text>
            </View>
    
          </View>
          <View style={styles.itemContainer}>
            <Image source={ require( '../src/images/miniatura.jpg') } style={styles.miniatura} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.mostViewedText}>Recorrido Virtual por París</Text>
              <Text style={styles.mostViewedSubText}>Javier - 8.3k Vistas - hace 24hrs</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Image source={ require('../src/images/miniatura.jpg') } style={styles.miniatura} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.mostViewedText}>Recorrido Virtual por París</Text>
              <Text style={styles.mostViewedSubText}>Javier - 8.3k Vistas - hace 24hrs</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Image source={require( '../src/images/miniatura.jpg') } style={styles.miniatura} />
            <View style={styles.descriptionContainer}>
              <Text style={styles.mostViewedText}>Recorrido Virtual por París</Text>
              <Text style={styles.mostViewedSubText}>Javier - 8.3k Vistas - hace 24hrs</Text>
            </View>
          </View>
        </View>
      
    </ScrollView>
    </SafeAreaView>
  )
  
  
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
  },
  containerScroll: {
    backgroundColor: '#FFFFFF',
},
  
  banner: {
    justifyContent: 'center',
    height: 350,
    padding: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },

  bannerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerSubText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  videosContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  mostViewedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },  
  miniatura: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  mostViewedTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  mostViewedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mostViewedSubText: {
    fontSize: 12,
    color: '#666',
  },
  
});

export default HomeScreen;
