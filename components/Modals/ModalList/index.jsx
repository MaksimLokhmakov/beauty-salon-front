import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Animated, { ZoomInEasyUp, ZoomOutEasyUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import style from "./style";

const ModalList = ({ list, onPressListItem, visible, sortValue }) => {
  return (
    visible && (
      <Animated.View
        style={style.wrapper}
        entering={ZoomInEasyUp.duration(200)}
        exiting={ZoomOutEasyUp.duration(200)}
      >
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#e5e5e5" }}
            />
          )}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onPressListItem(item.name);
              }}
              style={style.listItem}
            >
              <Text>{item.name}</Text>
              {sortValue === item.name && (
                <Ionicons name="checkmark-sharp" size={18} color="black" />
              )}
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    )
  );
};

export default ModalList;
