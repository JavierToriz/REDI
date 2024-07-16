import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const numColumns = 3;
const imageSize = Dimensions.get("window").width / numColumns + 50;

const ImageGrid = () => {
  const escenas = [
    { id: "1", source: require("../images/miniatura.jpg") },
    { id: "2", source: require("../images/miniatura.jpg") },
    { id: "3", source: require("../images/miniatura.jpg") },
    { id: "4", source: require("../images/miniatura.jpg") },
    { id: "5", source: require("../images/miniatura.jpg") },
    { id: "6", source: require("../images/miniatura.jpg") },
  ];

  const numColumns = 3;

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      data={escenas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: imageSize - 10,
    height: imageSize - 10,
    borderRadius: 10,
  },
});

export default ImageGrid;
