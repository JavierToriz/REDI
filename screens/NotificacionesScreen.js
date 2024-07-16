import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function NotificacionesScreen() {
  return (
    <View style={styles.container}>
      <Text>NotificacionesScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
},
})