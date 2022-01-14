import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "./style";

const PlusButton = ({ openAddModalScreen }) => {
  return (
    <TouchableOpacity
      style={Button.wrapper}
      onPress={() => openAddModalScreen()}
    >
      <Ionicons
        style={{ left: 1.2, top: 0.5 }}
        name="ios-add-sharp"
        size={50}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default PlusButton;

// ! НЕ ИСПОЛЬЗУЕТСЯ