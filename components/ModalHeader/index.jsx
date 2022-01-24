import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";

export default function MadalHeader({
  onBack,
  onComplete,
  canBeAdded,
  headerText,
  rigthButton = "Добавить",
  leftButton = "Отмена",
}) {
  return (
    <View style={style.header}>
      <TouchableOpacity onPress={() => onBack(false)}>
        <Text
          style={{
            ...style.headerSideText,
            fontWeight: "500",
          }}
        >
          {leftButton}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#212121",
        }}
      >
        {headerText()}
      </Text>
      <TouchableOpacity onPress={() => onComplete()}>
        <Text
          style={{
            ...style.headerSideText,
            color: canBeAdded() ? "#C2185B" : "#8b979f76",
            fontWeight: "600",
          }}
        >
          {rigthButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
