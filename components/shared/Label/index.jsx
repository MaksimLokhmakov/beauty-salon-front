import { TouchableOpacity, Text } from "react-native";
import React from "react";

const Label = ({
  children,
  touchable = false,
  width = "auto",
  onPress,
  data,
}) => {
  console.log("Label");
  const press = () => onPress(data);
  return touchable ? (
    <TouchableOpacity onPress={press}>
      <Text style={{ color: "#C2185B", width: width }}>{children}</Text>
    </TouchableOpacity>
  ) : (
    <Text style={{ color: "#C2185B", width: width }}>{children}</Text>
  );
};

const arePropsEqual = (prevProps, nextProps) => {
  return true;
};

export default React.memo(Label, arePropsEqual);
