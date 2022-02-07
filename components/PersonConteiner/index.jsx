import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Linking, Easing } from "react-native";
import Swipeable from "react-native-swipeable";
import { FontAwesome5 } from "@expo/vector-icons";

import Avatar from "../Avatar";
import Bardge from "../Bardge";
import Person from "./style";

const PersonConteiner = ({
  item,
  onPress,
  openDeleteModal,
  setIsSwiping,
  onDelete,
}) => {
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
        height: 55,
        paddingHorizontal: 15,
        backgroundColor: "#12c212",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <FontAwesome5 name="phone-alt" size={23} color="#fff" />
    </View>
  );

  const rightContent = [
    <View
      style={{
        height: 55,
        paddingHorizontal: 15,
        backgroundColor: "#c71c41",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <FontAwesome5 name="trash-alt" size={23} color="#fff" />
    </View>,
  ];

  return (
    <Swipeable
      onSwipeStart={() => setIsSwiping(true)}
      swipeReleaseAnimationConfig={{
        toValue: { x: 0, y: 0 },
        duration: 250,
        easing: Easing.elastic(0.5),
        useNativeDriver: false,
      }}
      onSwipeRelease={() => setIsSwiping(false)}
      leftContent={!item.master && leftContent}
      rightContent={rightContent}
      rightActionActivationDistance={90}
      leftActionActivationDistance={90}
      onRightActionRelease={() => onDelete(item)}
      onLeftActionRelease={() => Linking.openURL(`tel:${item.tel}`)}
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
