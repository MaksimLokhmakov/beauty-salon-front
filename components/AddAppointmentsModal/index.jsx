import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Context } from "../../context";

import clientModal from "../AddModal/style";

const AddAppointmentModel = () => {
  const { visibleAppointmentsModal, setVisibleAppointmentsModel } =
    React.useContext(Context);
  return (
    <Modal
      visible={visibleAppointmentsModal}
      animationType={"slide"}
      transparent={true}
    >
      <View style={clientModal.wrapper}>
        <View style={clientModal.header}>
          <TouchableOpacity onPress={() => setVisibleAppointmentsModel(false)}>
            <Text
              style={{
                ...clientModal.headerSideText,
                fontWeight: "500",
              }}
            >
              Отмена
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#212121",
            }}
          >
            Добавить прием
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                ...clientModal.headerSideText,
                color: "#C2185B",
                fontWeight: "600",
              }}
            >
              Добавить
            </Text>
          </TouchableOpacity>
        </View>

        <Text>DeleteAppointment</Text>
        <TouchableOpacity onPress={() => setVisibleAppointmentsModel(false)}>
          <Text>Скрыть</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddAppointmentModel;
