import React from "react";
import { View, Text, Modal, Button, TextInput } from "react-native";
import { Context } from "../../context";

import clientModal from "./style";

const AddMastersModal = () => {
  const { visibleMastersModal, setVisibleMastersModel } =
    React.useContext(Context);
  return (
      <Modal
        visible={visibleMastersModal}
        animationType="slide"
        transparent={true}
      >
        <View
          style={{
            position: "absolute",
            flex: 1,
            paddingTop: 50,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", color: "#FF4081" }}>
            Добавление мастера:{" "}
          </Text>
          <TextInput autoFocus={true} placeholder="Имя мастера"></TextInput>
          <TextInput autoFocus={true} placeholder="Номер телефона"></TextInput>
          <Button
            title="back"
            onPress={() => setVisibleMastersModel(false)}
          ></Button>
        </View>
      </Modal>
  );
};

export default AddMastersModal;
