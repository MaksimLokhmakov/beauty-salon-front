import React from "react";
import { View, Text } from "react-native";

import Group from "./style";

const Bardge = ({ color = "#fff", children }) => {
  return (
    <View
      style={{
        ...Group.wrapper,
        backgroundColor: color,
        width: children ? "auto" : 50,
      }}
    >
      <Text style={Group.text}>{children}</Text>
    </View>
  );
};

export default Bardge;
