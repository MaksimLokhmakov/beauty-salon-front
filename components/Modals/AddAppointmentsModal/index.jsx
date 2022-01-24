import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Context } from "../../../context";
import MadalHeader from "../../ModalHeader";
import style from "../style";

const AddAppointmentModel = () => {
  const { visibleAppointmentsModal, setVisibleAppointmentsModel } =
    React.useContext(Context);
  return (
    <Modal
      visible={visibleAppointmentsModal}
      animationType={"slide"}
      transparent={true}
    >
      <View style={style.wrapper}>
        <MadalHeader
          onBack={setVisibleAppointmentsModel}
          onComplete={() => {}}
          canBeAdded={() => {}}
          headerText={() => "Добавить прием"}
        />
      </View>
    </Modal>
  );
};

export default AddAppointmentModel;
