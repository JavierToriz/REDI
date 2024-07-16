import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ButtonTemas({
  title,
  onPress,
  backgroundColor,
  value,
}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress(value);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: isPressed ? "gray" : backgroundColor },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#FFFFFF",
  },
});
