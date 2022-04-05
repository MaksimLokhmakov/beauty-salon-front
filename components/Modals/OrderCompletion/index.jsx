import { View, Modal } from "react-native";
import React from "react";
import OrderCompletionInfo from "../../appointment/OrderCompletionInfo/OrderComplectionInfoWrapper";
import MadalHeader from "../../shared/ModalHeader";
import style from "../style";
import axios from "axios";
import { Context } from "../../../context";

const index = ({ currentAppointment, visible, setVisible }) => {
  const { getAppointments, getFullStat } = React.useContext(Context);
  const [currentNeedle, setCurrentNeedle] = React.useState({
    number: null,
    type: NaN,
  });
  const [checkedAddons, setCheckedAddons] = React.useState({
    injection: false,
    ointment: false,
    coloring: false,
  });
  const [price, setPrice] = React.useState("");

  const canBeAdded = currentNeedle.type && price.length >= 2;
  const start =
    currentAppointment.start.split(" ")[0].split("-").reverse().join("-") +
    "T" +
    currentAppointment.start.split(" ")[1];
  const finish =
    currentAppointment.finish.split(" ")[0].split("-").reverse().join("-") +
    "T" +
    currentAppointment.finish.split(" ")[1];

  console.log(currentNeedle);

  const onSubmit = () => {
    axios
      .put(`/orders/${currentAppointment.id}`, {
        price: price,
        area: currentAppointment.area,
        start: start,
        finish: finish,
        confirmed: true,
        finished: true,
        masterId: currentAppointment.master.id,
        clientId: currentAppointment.client.id,
        addons: checkedAddons,
        needle: currentNeedle,
      })
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  };

  const nullifyForm = () => {
    setCurrentNeedle({
      needle: null,
      type: NaN,
    });
    setCheckedAddons({
      injection: false,
      ointment: false,
      coloring: false,
    });
    setPrice("");
  };
  const onBack = () => {
    setVisible(false);
    nullifyForm();
  };
  const onComplete = () => {
    setVisible(false);
    onSubmit();
    getAppointments();
    getFullStat();
    nullifyForm();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ ...style.wrapper, backgroundColor: "#f1f3f4" }}>
        <MadalHeader
          headerText={() => ""}
          rigthButton="Завершить"
          onBack={onBack}
          canBeAdded={canBeAdded}
          onComplete={onComplete}
        />
        <OrderCompletionInfo
          isEditable
          price={price}
          setPrice={setPrice}
          checkedAddons={checkedAddons}
          setCheckedAddons={setCheckedAddons}
          currentNeedle={currentNeedle}
          setCurrentNeedle={setCurrentNeedle}
        />
      </View>
    </Modal>
  );
};

export default index;
