import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVrCardboard, faMobile } from '@fortawesome/free-solid-svg-icons';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import * as Sharing from 'expo-sharing';
import { pathToDownloadAPK } from './path';

export default function CustomScreen({ route, navigation }) {
  const { path } = route.params;

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission for notifications was not granted.');
        Alert.alert('Permisos de Notificación', 'Necesitas permitir notificaciones para recibir actualizaciones.');
      }
    };
    
    requestPermissions();
  }, []);

  const WatchMobile = () => {
    console.log('Navigating to WebViewScreen with path:', path);
    navigation.navigate('WebViewScreen', { path: path });
  };

  const WatchVR = async () => {
    const url = `${pathToDownloadAPK}/${path}`;
    const fileUri = FileSystem.cacheDirectory + 'redi.apk';

    try {
      // Mostrar notificación de que la descarga ha comenzado
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Descarga en progreso',
          body: 'La descarga del archivo APK ha comenzado.',
        },
        trigger: null,
      });

      console.log('Downloading APK from URL:', url);
      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log('APK downloaded to:', uri);

      // Mostrar notificación de que la descarga se ha completado
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Descarga completada',
          body: 'El archivo APK ha sido descargado. Se abrirá ahora.',
        },
        trigger: null,
      });

      if (Platform.OS === 'android') {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/vnd.android.package-archive',
            dialogTitle: 'Abrir APK',
          });
        } else {
          Alert.alert('Compartición no disponible', 'La compartición no está disponible en este dispositivo.');
        }
      } else {
        Alert.alert('Plataforma no soportada', 'Esta funcionalidad solo está disponible en Android.');
      }
    } catch (error) {
      console.error('Download error:', error);

      // Mostrar notificación de error de descarga
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Error de descarga',
          body: 'Hubo un problema al descargar el APK.',
        },
        trigger: null,
      });

      Alert.alert('Error', 'Hubo un problema al descargar el APK');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#01041C" barStyle="light-content" />
      <Text style={styles.title}>Disfruta de la escena en</Text>
      <TouchableOpacity style={styles.circleButton} onPress={WatchMobile}>
        <FontAwesomeIcon icon={faMobile} size={40} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={WatchVR}>
        <FontAwesomeIcon icon={faVrCardboard} size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01041C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
    backgroundColor: '#0070FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
