import { View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import style from "./style";

const CheckBox = ({ item = false, pickedObject = false }) => {
  const isPickedDate = item === pickedObject;
  const dynamicStyle = {
    borderColor: isPickedDate ? "#5bdd8f" : "#8b979f",
    backgroundColor: isPickedDate ? "#5bdd8f" : "#fff",
  };

  return (
    <View style={[dynamicStyle, style.wrapper]}>
      <FontAwesome5 style={{ top: 0.5 }} name="check" size={11} color="#fff" />
    </View>
  );
};

export default CheckBox;
