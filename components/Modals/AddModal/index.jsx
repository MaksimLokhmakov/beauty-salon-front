import React from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import { Context } from "../../../context";
import axios from "axios";
import Avatar from "../../shared/Avatar";
import Table from "../../shared/Table";
import MadalHeader from "../../shared/ModalHeader";
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

  const canBeAdded = () => {
    if (!master)
      return phone.length === 17 && name.length >= 2 && secondName.length >= 2;
    return (
      phone.length === 17 &&
      name.length >= 2 &&
      secondName.length >= 2 &&
      perсent.length >= 1
    );
  };

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

  const phoneInput = () => (
    <TextInput
      style={{ ...style.input, fontSize: 16 }}
      onSubmitEditing={() => master && percentInputRef.current.focus()}
      ref={phoneInputRef}
      placeholder="+375 __ ___-__-__"
      value={phone}
      onChangeText={(change) => setPhone(change)}
      maxLength={17}
    />
  );

  const secondInput = () =>
    master ? (
      <TextInput
        style={{ ...style.input, fontSize: 14 }}
        ref={percentInputRef}
        blurOnSubmit={false}
        keyboardType="numeric"
        value={perсent}
        onChangeText={(change) => setPersent(change)}
        maxLength={3}
      />
    ) : (
      <Text></Text>
    );

  const phoneInputRef = React.useRef();
  const secondNameInputRef = React.useRef();
  const percentInputRef = React.useRef();

  return (
    <Modal
      visible={visible}
      animationType={adit ? "fade" : "slide"}
      transparent={true}
    >
      {itemToDelete ? (
        <View style={style.buttonsWrapper}>
          <View
            style={{
              borderBottomColor: "#22112234",
              borderBottomWidth: 0.5,
              borderTopStartRadius: 25,
              borderTopEndRadius: 25,
              width: "70%",
              height: 45,
              backgroundColor: "#ebedf0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {itemToDelete.name}
            </Text>
          </View>
          <TouchableOpacity
            style={clientModal.button}
            onPress={() => {
              onDelete(itemToDelete);
              onClose();
              setItemToDelete(false);
            }}
          >
            <Text style={{ ...clientModal.buttonText, color: "#b41212" }}>
              Удалить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onClose();
              setItemToDelete(false);
            }}
            style={clientModal.button}
          >
            <Text style={clientModal.buttonText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={style.wrapper}>
          <MadalHeader
            onBack={onClose}
            onComplete={canBeAdded() ? onSubmit() : () => {}}
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

          <Table
            numberOfRows={2}
            firstLabel={() => "сотовый"}
            firstValue={phoneInput}
            secondLabel={() => (master ? "процент" : "")}
            secondValue={secondInput}
          />
        </View>
      )}
    </Modal>
  );
};

export default AddModal;
