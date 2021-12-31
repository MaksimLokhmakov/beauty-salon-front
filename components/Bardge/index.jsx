import React from "react";
import { View, Text } from "react-native";

import Group from "./style";

const Bardge = ({ color = "#F8BBD0", children }) => {
  return (
    <View style={{ ...Group.wrapper, backgroundColor: color }}>
      <Text style={Group.text}>{children}</Text>
    </View>
  );
};

export default Bardge;
