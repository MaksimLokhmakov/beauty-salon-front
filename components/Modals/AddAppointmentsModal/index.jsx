import React from "react";
import {
  View,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MadalHeader from "../../shared/ModalHeader";
import Table from "../../shared/Table";
import Label from "../../shared/Label";
import SearchBar from "../../shared/SearchBar";
import AddItemConteiner from "../../shared/AddItemConteiner";
import { Context } from "../../../context";
import MaskInput from "react-native-mask-input";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Screen from "../../../screens/style";
import style from "../style";
import Card from "../../AppointmentCard/style";
import axios from "axios";

const AddAppointmentModel = ({ visible, onClose, data }) => {
  const { getAppointments } = React.useContext(Context);
  const [idleTime, setIdleTime] = React.useState([]);

  const [currentClient, setCurrentClient] = React.useState({});
  const [duration, setDuration] = React.useState("");
  const [area, setArea] = React.useState("");

  const title = data && data.title;
  const rawDate = data && data.rawDate;
  const masterName = data && data.master && data.master.name;
  const [currentIdleTime, setCurrentIdleTime] = React.useState("");
  const handleIdleTimePick = (currentTime) => {
    setCurrentIdleTime(currentTime);
  };

  const timeCompare = (firstTime, secondTime) => {
    // * если 2 параметр функции => 1 возвращает true
    // * формат времени "**:**"
    if (firstTime && secondTime) {
      const firstTimeSplit = firstTime.split(":");
      const secondTimeSplit = secondTime.split(":");

      if (firstTimeSplit[1] >= 60 || secondTimeSplit[1] >= 60) return false;

      if (firstTime === secondTime) return true;
      if (firstTimeSplit[0] < secondTimeSplit[0]) return true;
      if (
        firstTimeSplit[0] === secondTimeSplit[0] &&
        firstTimeSplit[1] < secondTimeSplit[1]
      )
        return true;
    }
    return false;
  };

  const isEnteredDurationCorrect =
    duration.length === 13 &&
    duration.split(" - ")[0] !== duration.split(" - ")[1] &&
    timeCompare(duration.split(" - ")[0], duration.split(" - ")[1]) &&
    timeCompare(currentIdleTime.start, duration.split(" - ")[0]) &&
    timeCompare(duration.split(" - ")[1], currentIdleTime.finish);

  const isObjectNotEmpty = (obj) => {
    for (let key in obj) {
      return true;
    }

    return false;
  };

  const canBeAdded =
    isObjectNotEmpty(currentClient) && isEnteredDurationCorrect && area;

  const areaInputRef = React.useRef();
  const timeInputMask = [
    /\d/,
    /\d/,
    ":",
    /\d/,
    /\d/,
    " ",
    "-",
    " ",
    /\d/,
    /\d/,
    ":",
    /\d/,
    /\d/,
  ];
  const dateTimeTableData = {
    data: [
      {
        label: <Label width={50}>дата</Label>,
        value: (
          <View style={style.input}>
            <Text>{title}</Text>
          </View>
        ),
      },
      {
        label: <Label width={50}>время</Label>,
        value: (
          <MaskInput
            style={style.input}
            value={duration}
            onChangeText={(e) => setDuration(e)}
            mask={timeInputMask}
            maxLength={13}
            onSubmitEditing={() => areaInputRef.current.focus()}
            autoFocus
          />
        ),
      },
    ],
  };
  const isClientPicked = currentClient.name;
  const masterClientTableData = {
    data: isClientPicked
      ? [
          {
            label: <Label width={50}>мастер</Label>,
            value: (
              <View style={{ ...style.input }}>
                <Text>{masterName}</Text>
              </View>
            ),
          },
          {
            label: <Label width={50}>клиент</Label>,
            value: (
              <View style={{ ...style.input }}>
                <Text>{currentClient.name}</Text>
              </View>
            ),
          },
        ]
      : [
          {
            label: <Label width={50}>мастер</Label>,
            value: (
              <View style={{ ...style.input }}>
                <Text>{masterName}</Text>
              </View>
            ),
          },
        ],
  };
  const areaTableData = {
    data: [
      {
        label: <Label width={50}>зона</Label>,
        value: (
          <TextInput
            ref={areaInputRef}
            style={style.input}
            value={area}
            onChangeText={(e) => setArea(e)}
          />
        ),
      },
    ],
  };

  React.useEffect(() => {
    let currentDay = "";

    if (data && data.master) {
      for (let i in data.title) {
        if (parseInt(data.title[i])) currentDay += data.title[i];
      }

      axios
        .get(`/masters/${data.master.id}/idle/${currentDay}`)
        .then(({ data }) => setIdleTime(data.idle))
        .catch((err) => console.log(err));
    }
  }, [visible]);
  const handleClientPick = (currentClient) => {
    setCurrentClient(currentClient);
  };

  const nullifyForm = () => {
    setCurrentIdleTime("");
    setCurrentClient({});
    setArea("");
    setDuration("");
  };

  const handleClose = () => {
    onClose(false);
    nullifyForm();
  };

  const onSubmit = () => {
    axios
      .post("/orders", {
        area: area,
        start: rawDate + "T" + duration.split(" - ")[0],
        finish: rawDate + "T" + duration.split(" - ")[1],
        masterId: data && data.master.id,
        clientId: currentClient.id,
      })
      .then(() => {
        handleClose();
        getAppointments();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Modal visible={visible} animationType={"slide"} transparent={true}>
      <View style={{ ...style.wrapper, backgroundColor: "#f1f3f4" }}>
        <MadalHeader
          onBack={handleClose}
          onComplete={onSubmit}
          canBeAdded={canBeAdded}
          headerText={() => "Добавить прием"}
        />

        {currentIdleTime ? (
          <AddAppointmentForm
            areaTableData={areaTableData}
            masterClientTableData={masterClientTableData}
            dateTimeTableData={dateTimeTableData}
            handleClientPick={handleClientPick}
            currentIdleTime={currentIdleTime}
            isEnteredDurationCorrect={isEnteredDurationCorrect}
          />
        ) : (
          <PickTimeBlock
            idleTime={idleTime}
            handleTimePick={handleIdleTimePick}
          />
        )}
      </View>
    </Modal>
  );
};

const PickTimeBlock = ({ idleTime, handleTimePick }) => {
  console.log(idleTime);
  const pickTime = (currentTime) => {
    handleTimePick(currentTime);
  };

  return (
    <View
      style={{ ...Card.Wrapper, flex: 0, paddingHorizontal: 15, zIndex: 0 }}
    >
      <View style={{ left: 0, top: -3 }}>
        <Text style={{ color: "#C2185B" }}>Доступное время: </Text>
      </View>
      <FlatList
        data={idleTime}
        keyExtractor={(item) => item.start + item.finish}
        renderItem={({ item, index }) => {
          const lastElement = idleTime.length - 1 === index;

          return (
            <AddItemConteiner
              onPress={pickTime}
              item={item}
              lastElement={lastElement}
            />
          );
        }}
      />
    </View>
  );
};

const PickClientBlock = ({ handleClientPick }) => {
  const { clients } = React.useContext(Context);
  const [currentClients, setCurrentClients] = React.useState(clients);
  const [searchValue, setSearchValue] = React.useState("");
  const [isPicking, setIsPicking] = React.useState(false);

  const onPickClient = (currentClient) => {
    const newClients = clients.filter((item) => item.id !== currentClient.id);
    setCurrentClients(newClients);
  };
  const pickClient = (currentClient) => {
    handleClientPick(currentClient);
    onPickClient(currentClient);
    setIsPicking(false);
  };
  const filteredClients = currentClients.filter((item) =>
    item.name.includes(searchValue)
  );

  return (
    <>
      <View
        style={{
          ...Screen.infoCardWrapper,
          flex: 0,
          paddingHorizontal: 15,
          height: "auto",
        }}
      >
        <TouchableOpacity
          onPress={() => setIsPicking(true)}
          style={{ paddingBottom: 10 }}
        >
          <Text style={{ fontSize: 15, color: "#C2185B" }}>
            Выбрать клиента
          </Text>
        </TouchableOpacity>

        {isPicking && (
          <Animated.View
            onPress={() => setIsPicking(false)}
            entering={FadeIn}
            exiting={FadeOut}
            style={{
              top: -500,
              position: "absolute",
              right: -100,
              width: "200%",
              height: "5000%",
              zIndex: 99,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
        )}
      </View>

      <Modal visible={isPicking} transparent={true} animationType="slide">
        <View
          style={{
            position: "absolute",
            ...Screen.infoCardWrapper,
            paddingTop: 30,
            borderRadius: 40,
            flex: 0,
            width: "100%",
            paddingHorizontal: 15,
            height: "60%",
            bottom: -10,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
          }}
        >
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            styleWrapper={{
              top: -10,
              width: "100%",
            }}
            styleInput={{ width: "100%" }}
          />
          <View
            style={{
              ...Screen.infoCardWrapper,
              backgroundColor: "#f1f3f4",
              flex: 0,
            }}
          >
            <FlatList
              data={filteredClients}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                const lastElement = filteredClients.length - 1 === index;

                return (
                  <AddItemConteiner
                    onPress={pickClient}
                    item={item}
                    lastElement={lastElement}
                    animated={false}
                  />
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const AddAppointmentForm = ({
  dateTimeTableData,
  masterClientTableData,
  areaTableData,
  handleClientPick,
  currentIdleTime,
  isEnteredDurationCorrect,
}) => {
  // console.log("masterClientTableData", masterClientTableData);

  return (
    <View style={{ top: -10 }}>
      <View style={{ ...Screen.infoCardWrapper, flex: 0, height: 92 }}>
        <Table tableValues={dateTimeTableData} />
        <View style={{ position: "absolute", right: 10, bottom: 5 }}>
          <Text
            style={{ color: isEnteredDurationCorrect ? "#0bd45b" : "#999aa0" }}
          >
            {currentIdleTime.start + " - " + currentIdleTime.finish}
          </Text>
        </View>
      </View>

      <View style={{ ...Screen.infoCardWrapper, flex: 0 }}>
        <Table tableValues={areaTableData} />
      </View>

      <View style={{ ...Screen.infoCardWrapper, flex: 0 }}>
        <Table tableValues={masterClientTableData} />
      </View>

      <PickClientBlock handleClientPick={handleClientPick} />
    </View>
  );
};

export default AddAppointmentModel;
