import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import{ Icon, Entypo, FontAwesome } from '@expo/vector-icons' 

export default function SearchHeader() {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Buscar"
        style={styles.searchInput}
      />
    </View>
  )

}

const styles = StyleSheet.create({
    searchContainer: {
      alignItems: 'center',
      backgroundColor: 'red',
      borderRadius: 5,
    
    },
    
    searchInput: {
      flex: 1,
      height: 40,
    },
  });