import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CheckBox from "../CheckBox";
import Animated, { FadeInUp } from "react-native-reanimated";
import style from "./style";

const AddItemConteiner = ({
  item,
  pickedObject,
  pickingDate,
  onPress,
  lastElement,
}) => {
  const text = pickingDate ? item.title : item.name;
  const handlePress = () => onPress(item);

  const propsStyle = {
    borderBottomWidth: lastElement ? 0 : 0.5,
    marginBottom: lastElement ? 10 : 0,
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View entering={FadeInUp} style={[style.wrapper, propsStyle]}>
        <CheckBox item={item} pickedObject={pickedObject} />
        <Text>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AddItemConteiner;
