import { TouchableOpacity, Text } from "react-native";
import React from "react";

const Label = ({ children, touchable = false, width = "auto" }) => {
  return touchable ? (
    <TouchableOpacity>
      <Text style={{ color: "#C2185B", width: width }}>{children}</Text>
    </TouchableOpacity>
  ) : (
    <Text style={{ color: "#C2185B", width: width }}>{children}</Text>
  );
};

export default Label;
