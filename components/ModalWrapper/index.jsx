import React from "react";
import { Modal, View } from "react-native";

import modalWrapper from "./style";

const ModalWrapper = ({ children, visible }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={modalWrapper.wrapper}>{children}</View>
    </Modal>
  );
};

export default ModalWrapper;

// ! НЕ ИСПОЛЬЗУЕТСЯ
