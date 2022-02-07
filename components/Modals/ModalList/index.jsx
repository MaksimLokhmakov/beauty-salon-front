import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import style from "./style";

const ModalList = ({ list, onPressListItem, visible, sortValue }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={style.wrapper}>
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
      </View>
    </Modal>
  );
};

export default ModalList;
