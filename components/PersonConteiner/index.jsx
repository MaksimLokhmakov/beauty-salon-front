import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Bardge } from "..";
import getAvatarColor from "../../utils/getAvatarColor";
import Person from "./style";

const PersonConteiner = ({ item, onPress, lastElemMarging = 0 }) => {
  const textBardge = (item) => {
    if (item.persent) return item.persent + "%";
    if (item.date) return item.date.split(" ")[2];
  };
  const textGray = (item) => {
    if (item.duration) return "Время: " + item.duration + " ч.";
    return item.phoneNumber;
  };
  const avatarColor = getAvatarColor(item.fullName[0].toUpperCase());
  return (
    <TouchableOpacity
      style={{ ...Person.conteiner, marginBottom: lastElemMarging }}
      onPress={() => onPress(item)}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{ backgroundColor: avatarColor.background, ...Person.avatar }}
        >
          <Text style={{ color: avatarColor.color, ...Person.letter }}>
            {item.fullName[0].toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={Person.fullName}>{item.fullName}</Text>
          <Text style={Person.textGray}>{textGray(item)}</Text>
        </View>
      </View>

      {textBardge(item) && <Bardge>{textBardge(item)}</Bardge>}
    </TouchableOpacity>
  );
};

export default PersonConteiner;
