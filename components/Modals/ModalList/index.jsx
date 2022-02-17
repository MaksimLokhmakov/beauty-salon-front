import { View, Text, TouchableOpacity, FlatList, Platform } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import style from "./style";

const ModalList = ({ list, onPressListItem, visible, sortValue }) => {
  return (
    visible && (
      <Animated.View
        style={{ ...style.wrapper, top: Platform.OS === "android" ? 95 : 10 }}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
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
