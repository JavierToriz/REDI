import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function HomeScreen()  {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: styles.container.backgroundColor,
      },
    });
  }, [navigation]);


  return (
    <View style={styles.container}> 
      <Text>Home</Text>
    </View>
    
  )
  
  
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFF',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 20,
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
