import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pathToAllCommentsPublication, pathToCommentPublication } from "./path";

const Avatar = ({ username }) => {
  const initials = username.split(' ').map(name => name[0]).join('');
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};

export default function ComentariosScreen({ route }) {
  const { path } = route.params;
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const url = `${pathToAllCommentsPublication}/1`;
    fetchData(url);
  }, []);

  const fetchData = async (url) => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });
      setData(response.data.comentarios);
      // console.log(response.data.comentarios);
    } catch (error) {
      console.error(error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    }
  };

  const handleSendComment = async () => {
    try {
      const storedItemStr = await AsyncStorage.getItem("userToken");
      const token = JSON.parse(storedItemStr);
      if(token === null){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }],
        });
      }
      const urlSend = pathToCommentPublication+"/"+1; 
      
      await axios.post(urlSend, {
        contenido: comment,
        
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      });

      console.log('Comentario enviado:', comment);
      setComment(''); 
      
      fetchData(`${pathToAllCommentsPublication}/1`);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LogIn' }],
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Avatar username={item.username} />
            <View style={styles.commentContent}>
              <Text style={styles.textName}>
                {item.username}
              </Text>
              <Text style={styles.textComment}>{item.comentario}</Text>
              <Text style={styles.textDate}>
                {formatDate(item.fecha_comentario)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.commentBox}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu comentario..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textName: {
    fontSize: 17,
    fontWeight: "500",
  },
  textComment: {
    fontSize: 14,
    marginTop: 5,
  },
  textDate: {
    fontSize: 12,
    color: "grey",
    marginTop: 5,
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
