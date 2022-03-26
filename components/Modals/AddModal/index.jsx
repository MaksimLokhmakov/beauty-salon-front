import React from "react";
import { View, Text, TextInput, Modal } from "react-native";
import MaskInput from "react-native-mask-input";
import { Context } from "../../../context";
import axios from "axios";
import Avatar from "../../shared/Avatar";
import Table from "../../shared/Table";
import MadalHeader from "../../shared/ModalHeader";
import Label from "../../shared/Label";
import style from "../style";

const AddModal = ({
  master = false,
  visible,
  adit = false,
  item,
  setChanges,
  onDelete,
}) => {
  const {
    setVisibleClientsModel,
    setClients,
    setVisibleMastersModel,
    setMasters,
    setVisibleClientsReductModal,
    setVisibleMastersReductModal,
    setItemToDelete,
    itemToDelete,
  } = React.useContext(Context);
  const [name, setName] = React.useState(item ? item.name.split(" ")[0] : "");
  const [secondName, setSecondName] = React.useState(
    item ? item.name.split(" ")[1] : ""
  );
  const [phone, setPhone] = React.useState(item ? item.tel : "");
  const [perсent, setPersent] = React.useState(
    item ? (item.percent * 100).toFixed() : ""
  );

  const phoneInputRef = React.useRef();
  const secondNameInputRef = React.useRef();
  const percentInputRef = React.useRef();

  const canClientBeAdded =
    name.length >= 2 && secondName.length >= 2 && phone.length === 17;
  const canMasterBeAdded =
    name.length >= 2 &&
    secondName.length >= 2 &&
    phone.length === 17 &&
    perсent.length >= 1;
  const canBeAdded = master ? canMasterBeAdded : canClientBeAdded;

  // ! номер 17

  const getHeader = () => {
    if (adit) {
      return "";
    }
    return master ? "Добавить мастера" : "Добавить клиента";
  };

  const onAddMaster = () => {
    setMasters((prev) => [
      {
        id: Math.random(),
        name: name + " " + secondName,
        tel: phone,
        percent: perсent / 100,
      },
      ...prev,
    ]);

    axios
      .post("/masters", {
        name: name + " " + secondName,
        tel: phone,
        percent: (perсent / 100).toFixed(2),
      })
      .then(() => console.log("OK"))
      .catch((e) => console.log("ERR", e));

    nullifyForm();
    setVisibleMastersModel(false);
  };

  const onAddClient = () => {
    setClients((prev) => [
      { id: Math.random(), name: name + " " + secondName, tel: phone },
      ...prev,
    ]);
    axios
      .post("/clients", { name: name + " " + secondName, tel: phone })
      .then(() => console.log("OK"))
      .catch((e) => console.log("ERR", e));
    nullifyForm();
    setVisibleClientsModel(false);
  };

  const onReductMaster = () => {
    setChanges({
      id: item.id,
      name: name + " " + secondName,
      tel: phone,
      percent: perсent / 100,
    });
    setVisibleMastersReductModal(false);
    setMasters((prev) =>
      prev.map((master) => {
        if (master.id === item.id)
          return {
            id: item.id,
            name: name + " " + secondName,
            tel: phone,
            percent: perсent / 100,
          };
        return master;
      })
    );
    axios
      .put("/masters", {
        id: item.id,
        name: name + " " + secondName,
        tel: phone,
        percent: perсent / 100,
      })
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  };

  const onReductClient = () => {
    setChanges({
      id: item.id,
      name: name + " " + secondName,
      tel: phone,
    });
    setVisibleClientsReductModal(false);
    setClients((prev) =>
      prev.map((client) => {
        if (client.id === item.id)
          return {
            id: item.id,
            name: name + " " + secondName,
            tel: phone,
          };
        return client;
      })
    );
    axios
      .put("/clients", {
        id: item.id,
        name: name + " " + secondName,
        tel: phone,
      })
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  };

  const nullifyForm = () => {
    setName("");
    setSecondName("");
    setPhone("");
    setPersent("");
  };

  const onSubmit = () => {
    if (adit) {
      return master ? onReductMaster : onReductClient;
    }
    return master ? onAddMaster : onAddClient;
  };

  const onClose = () => {
    if (adit) {
      master
        ? setVisibleMastersReductModal(false)
        : setVisibleClientsReductModal(false);
      return;
    }
    master ? setVisibleMastersModel(false) : setVisibleClientsModel(false);
    return nullifyForm();
  };

  const phoneInputMask = [
    "+",
    "3",
    "7",
    "5",
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ];

  const phoneInput = (
    <MaskInput
      style={{ ...style.input, fontSize: 16 }}
      onSubmitEditing={() => master && percentInputRef.current.focus()}
      ref={phoneInputRef}
      value={phone}
      onChangeText={(change) => setPhone(change)}
      maxLength={17}
      mask={phoneInputMask}
    />
  );

  const secondInput = (
    <MaskInput
      style={{ ...style.input, fontSize: 14 }}
      ref={percentInputRef}
      blurOnSubmit={false}
      keyboardType="numeric"
      value={perсent}
      onChangeText={(change) => setPersent(change)}
      maxLength={2}
    />
  );
  const tableValuesData = master
    ? [
        { label: <Label>мобильный</Label>, value: phoneInput },
        { label: <Label>процент</Label>, value: secondInput },
      ]
    : [{ label: <Label>мобильный</Label>, value: phoneInput }];

  const tableValues = {
    data: tableValuesData,
  };

  return (
    <Modal
      visible={visible}
      animationType={adit ? "fade" : "slide"}
      transparent={true}
    >
      <View style={style.wrapper}>
        <MadalHeader
          onBack={onClose}
          onComplete={canBeAdded ? onSubmit() : () => {}}
          canBeAdded={canBeAdded}
          headerText={getHeader}
        />

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            marginBottom: 15,
          }}
        >
          <Avatar
            fullName={name + " " + secondName}
            width={85}
            height={85}
            size={36}
          />
          <View style={{ flex: 1, marginLeft: 5 }}>
            <TextInput
              autoFocus={true}
              placeholder="Имя"
              style={{ ...style.input, fontSize: 18 }}
              value={name}
              onChangeText={(change) => setName(change)}
              maxLength={10}
              onSubmitEditing={() => secondNameInputRef.current.focus()}
            />
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#BDBDBD",
              }}
            />
            <TextInput
              ref={secondNameInputRef}
              onSubmitEditing={() => phoneInputRef.current.focus()}
              placeholder="Фамилия"
              style={{ ...style.input, fontSize: 18 }}
              value={secondName}
              onChangeText={(change) => setSecondName(change)}
              maxLength={14}
            />
          </View>
        </View>

        <Table tableValues={tableValues} />
      </View>
    </Modal>
  );
};

export default AddModal;
