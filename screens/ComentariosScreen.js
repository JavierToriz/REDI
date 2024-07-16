import { StyleSheet, Text, View,ScrollView, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'

export default function ComentariosScreen() {
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData("https://randomuser.me/api/?results=20")
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      console.log(json.results)
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <ScrollView style={styles.container}>
      {
        data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer} >
              <Image source={{url: item.picture.large}} 
                style={styles.image}
              />
              <View>
                <Text style={styles.textName} > {item.name.first} {item.name.last} </Text>
                <Text styke={styles.textEmail}> {item.login.username} </Text>
              </View>
            </View>
          )
        } ) 
      }


    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF'
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textName: {
      fontSize: 17,
      marginLeft: 10,
      fontWeight: "500"
    },
    textEmail: {
      fontSize: 14,
      marginLeft: 10,
      color: 'grey'
    },
})