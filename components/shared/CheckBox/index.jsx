import { View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import style from "./style";

const CheckBox = ({ item, pickedObject, colored = false }) => {
  const isPickedDate = item === pickedObject;
  const dynamicStyle = {
    borderColor: isPickedDate || colored ? "#5bdd8f" : "#8b979f",
    backgroundColor: isPickedDate || colored ? "#5bdd8f" : "#fff",
  };

  console.log("item", item, "  ----  ", pickedObject);

  return (
    <View style={[dynamicStyle, style.wrapper]}>
      <FontAwesome5 style={{ top: 0.5 }} name="check" size={11} color="#fff" />
    </View>
  );
};

export default CheckBox;
