import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {  useCameraPermissions, CameraView, Camera, CameraType } from 'expo-camera';
import ButtonCamera from '../src/components/buttonCamera';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-vector-icons/FontAwesome';


function CameraScreen() {

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState('off');
  const [imageCount, setImageCount] = useState(0);
  const cameraRef = useRef(null);
  
  const navigation = useNavigation();



  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    console.log(facing)
  }
  function flashFunction() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
    console.log(flash)
  }
  

  const takePicture = async () => {
    if(cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        setImageCount(imageCount + 1);

      } catch(e) {
        console.log(e);
      } 
    }
  }

  


  return (
    <View style={styles.container}>
      <View style={styles.containerBotones}>
          <ButtonCamera icon="cross" size={34} onPress={() => navigation.goBack()}/>
      </View>
      
      <CameraView style={styles.camera} facing={facing} flash={flash} ref={cameraRef}>
      <ButtonCamera title={'Girar'} icon="camera" onPress={toggleCameraFacing}/>
      <ButtonCamera title={'Tomar foto'} icon="camera" onPress={takePicture} />
      </CameraView>
      <View style={styles.preview}>
          
          <ButtonCamera size={46} icon="circle" onPress={takePicture} />
          
          <View style={styles.preview2}>
      
          <Text style={styles.counter}>Photos Taken: {imageCount}</Text>
          {
            image && 
            
                <Image source={{uri: image}} style={styles.image}/>
          }   

          </View>      
          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 15,
    
  },
  containerBotones: {
    padding: 10,
    marginTop: 10,
    alignItems: 'flex-end',
    backgroundColor: 'green'
  },
  preview: {
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',

  },
  preview2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginTop: 10,
  },
  previewImage: {
    width: '100%'
  },
  image: {
    width: 80,
    height: 80,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  counter: {
    color: 'white'
  }
  
  
});

export default CameraScreen;
