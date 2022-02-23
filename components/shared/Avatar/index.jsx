import React from "react";
import { View, Text } from "react-native";
import avatar from "./style";
import getAvatarColor from "../../../utils/getAvatarColor";

const Avatar = ({ fullName = "K", width = 40, height = 40, size = 17 }) => {
  const fullNameUpperSplit = fullName.toUpperCase().split(" ");
  const avatarColor = getAvatarColor(fullNameUpperSplit[0]);
  const fullNameFisrtLetters = fullNameUpperSplit[1]
    ? fullNameUpperSplit[0][0] + fullNameUpperSplit[1][0]
    : fullNameUpperSplit[0][0];

  const propsStyles = {
    avatar: {
      backgroundColor: avatarColor.background,
      width: width,
      height: height,
    },
    letter: {
      color: avatarColor.color,
      fontSize: size,
    },
  };

  return (
    <View style={[avatar.avatar, propsStyles.avatar]}>
      <Text style={[avatar.letter, propsStyles.letter]}>
        {fullNameFisrtLetters}
      </Text>
    </View>
  );
};
export default Avatar;
