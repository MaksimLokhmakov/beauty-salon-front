import { Text, TouchableOpacity } from "react-native";
import React from "react";
import CheckBox from "../CheckBox";
import Animated, { FadeInUp } from "react-native-reanimated";
import style from "./style";

const AddItemConteiner = ({ item, pickedObject, onPress, lastElement }) => {
  const handlePress = () => onPress(item);
  console.log("AddItemConteiner");

  const propsStyle = {
    borderBottomWidth: lastElement ? 0 : 0.5,
    marginBottom: lastElement ? 10 : 0,
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View entering={FadeInUp} style={[style.wrapper, propsStyle]}>
        <CheckBox item={item} pickedObject={pickedObject} />
        <Text>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.lastElement === nextProps.lastElement;
}

export default React.memo(AddItemConteiner, arePropsEqual);
