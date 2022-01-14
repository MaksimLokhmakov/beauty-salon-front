import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Avatar from "../Avatar";
import Bardge from "../Bardge";
import Person from "./style";

const PersonConteiner = ({ item, onPress, openDeleteModal }) => {
  const textBardge = (item) => {
    if (item.percent) return (item.percent * 100).toFixed() + "%";
    if (item.start) return item.start.split(" ")[1];
  };
  const textGray = (item) => {
    if (item.master) return "Мастер: " + item.master.name.split(" ")[1];
    return item.tel;
  };

  return (
    <TouchableOpacity
      style={Person.conteiner}
      onPress={() => onPress(item)}
      onLongPress={() => openDeleteModal(item)}
    >
      <View style={Person.iconConteiner}>
        <FontAwesome5 name="trash-alt" size={20} color="#C2185B" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Avatar fullName={item.client ? item.client.name : item.name} />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#f3f3f3",
            paddingBottom: 5,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={Person.fullName}>
              {item.client ? item.client.name : item.name}
            </Text>
            <Text style={Person.textGray}>{textGray(item)}</Text>
          </View>

          <Bardge>{textBardge(item)}</Bardge>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonConteiner;
