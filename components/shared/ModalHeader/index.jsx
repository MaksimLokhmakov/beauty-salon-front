import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";

const MadalHeader = ({
  onBack,
  onComplete,
  canBeAdded,
  headerText,
  rigthButton = "Добавить",
  leftButton = "Отмена",
}) => {
  const goBack = () => onBack(false);
  const onSubmit = () => onComplete();

  return (
    <View style={style.header}>
      <TouchableOpacity onPress={goBack}>
        <Text style={style.sideText}>{leftButton}</Text>
      </TouchableOpacity>
      <Text style={style.text}>{headerText()}</Text>
      <TouchableOpacity onPress={onSubmit}>
        <Text
          style={{
            ...style.sideText,
            color: canBeAdded ? "#C2185B" : "#8b979f76",
            fontWeight: "600",
          }}
        >
          {rigthButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MadalHeader;
