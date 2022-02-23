import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CheckBox from "../CheckBox";
import style from "./style";

const AddItemConteiner = ({ item, pickedObject, pickingMasters, onPress }) => {
  const text = pickingMasters ? item.name : item.title;
  const handlePress = () => onPress(item);

  console.log(item);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={style.wrapper}>
        <CheckBox item={item} pickedObject={pickedObject} />
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddItemConteiner;
