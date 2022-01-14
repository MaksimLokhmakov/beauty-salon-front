import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "./style";

const MainButton = ({ bColor, flex, text = false, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={{
        ...Button.wrapper,
        backgroundColor: bColor,
        flex: flex,
        height: 30,
      }}
      onPress={() => onPress()}
    >
      {text ? (
        <Text style={Button.text}>{text}</Text>
      ) : (
        <Ionicons name="call" size={20} color="#fff" />
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

// ! НЕ ИСПОЛЬЗУЕТСЯ
