import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Swipeable from "react-native-swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Avatar from "../Avatar";
import Bardge from "../Bardge";
import Person from "./style";

const PersonConteiner = ({ item, onPress, openDeleteModal, setIsSwiping }) => {
  const [isCalling, setIsCalling] = React.useState(false);

  const textBardge = (item) => {
    if (item.percent) return (item.percent * 100).toFixed() + "%";
    if (item.start)
      return item.start.split(" ")[1] + " - " + item.finish.split(" ")[1];
  };
  const textGray = (item) => {
    if (item.master) return "Мастер: " + item.master.name.split(" ")[1];
    return item.tel;
  };

  const leftContent = (
    <View
      style={{
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: "#74e674",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {isCalling ? (
        <MaterialCommunityIcons name="phone-in-talk" size={30} color="#fff" />
      ) : (
        <MaterialCommunityIcons name="phone" size={30} color="#fff" />
      )}
    </View>
  );

  const rightButtonsSwipeable = [
    <TouchableOpacity
      style={{ backgroundColor: "#00c900", height: 57 }}
    ></TouchableOpacity>,
  ];

  return (
    <Swipeable
      onSwipeStart={() => {
        setIsSwiping(true);
        setIsCalling(false);
      }}
      onSwipeRelease={() => setIsSwiping(false)}
      leftContent={!item.master && leftContent}
      rightButtons={rightButtonsSwipeable}
      leftActionActivationDistance={90}
      onLeftActionRelease={() => {
        setIsCalling(true);
        Linking.openURL(`tel:${item.tel}`);
      }}
    >
      <TouchableOpacity style={Person.conteiner} onPress={() => onPress(item)}>
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
    </Swipeable>
  );
};

export default PersonConteiner;
