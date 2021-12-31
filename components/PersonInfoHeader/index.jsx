import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MainButton } from "..";
import HeaderInfo from "./style";

const PersonInfoHeader = ({ item, mainButtonText }) => {
  return (
    <View style={HeaderInfo.CardInfoWrapper}>
      <TouchableOpacity
        onPress={() => console.log(1)}
        style={HeaderInfo.reductIconWrapper}
      >
        <Ionicons name="ellipsis-vertical" size={22} color="#b0aeae" />
      </TouchableOpacity>
      <Text style={HeaderInfo.number}>{item.phoneNumber}</Text>

      <View style={HeaderInfo.headerButtonsWrapper}>
        <MainButton bColor="#b0aeae" flex={0.83} text={mainButtonText} />
        <MainButton
          bColor="#4ee91b90"
          flex={0.14}
          onPress={() => Linking.openURL(`tel:${item.phoneNumber}`)}
        />
      </View>
    </View>
  );
};

export default PersonInfoHeader;
