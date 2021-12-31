import React from "react";
import { View, Text, Modal, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Context } from "../../context";

import clientModal from "./style";

const AddClientsModal = () => {
  const { visibleClientsModal, setVisibleClientsModel } =
    React.useContext(Context);
  return (
    <Modal
      visible={visibleClientsModal}
      animationType="slide"
      transparent={true}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          paddingTop: 50,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            color: "#C2185B",
            marginBottom: 20,
          }}
        >
          Добавление клиента:
        </Text>
        <TextInput
          autoFocus={true}
          label="Имя/Фамилия"
          mode="outlined"
          activeOutlineColor="#757575"
          style={{
            height: 50,
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
        />
        <TextInput
          label="Номер телефона"
          mode="outlined"
          activeOutlineColor="#757575"
          style={{
            height: 50,
            backgroundColor: "#fff",
            marginBottom: 30,
          }}
        />
        <TouchableOpacity
          onPress={() => setVisibleClientsModel(false)}
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#F8BBD0",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddClientsModal;
