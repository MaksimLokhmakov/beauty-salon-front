import React from "react";
import { View, Text } from "react-native";

import avatar from "./style";
import getAvatarColor from "../../utils/getAvatarColor";

const Avatar = ({ fullName = "K", width = 40, height = 40, size = 17 }) => {
  const avatarColor = getAvatarColor(fullName && fullName[0].toUpperCase());
  const getLetters = () => {
    if (fullName && fullName.split(" ")[1])
      return (
        fullName[0].toUpperCase() + fullName.split(" ")[1][0].toUpperCase()
      );
    if (fullName) return fullName[0].toUpperCase();
    return "";
  };
  return (
    <View
      style={{
        backgroundColor: avatarColor.background,
        ...avatar.avatar,
        width: width,
        height: height,
      }}
    >
      <Text
        style={{ color: avatarColor.color, ...avatar.letter, fontSize: size }}
      >
        {getLetters()}
      </Text>
    </View>
  );
};
export default Avatar;
