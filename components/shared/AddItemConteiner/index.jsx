import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CheckBox from "../CheckBox";
import Animated, { FadeInUp } from "react-native-reanimated";
import style from "./style";

const AddItemConteiner = ({ item, pickedObject, pickingDate, onPress }) => {
  const text = pickingDate ? item.title : item.name;
  const handlePress = () => onPress(item);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View entering={FadeInUp} style={style.wrapper}>
        <CheckBox item={item} pickedObject={pickedObject} />
        <Text>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AddItemConteiner;
