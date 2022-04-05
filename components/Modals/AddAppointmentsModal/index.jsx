import React from "react";
import { View, Modal, Text, TextInput } from "react-native";
import MadalHeader from "../../shared/ModalHeader";
import Label from "../../shared/Label";
import { Context } from "../../../context";
import MaskInput from "react-native-mask-input";
import style from "../style";
import axios from "axios";

import PickTimeBlock from "./PickTimeBlock";
import Form from "./Form";
import isObjectNotEmpty from "../../../utils/isObjectNotEmpty";
import timeCompare from "../../../utils/timeCompare";

const AddAppointmentModel = ({ visible, onClose, data }) => {
  const { getAppointments } = React.useContext(Context);

  const [isSubmit, setIsSubmit] = React.useState(false);

  const [idleTime, setIdleTime] = React.useState([]);
  const [currentClient, setCurrentClient] = React.useState({});
  const [duration, setDuration] = React.useState("");
  const [area, setArea] = React.useState("");
  const [currentIdleTime, setCurrentIdleTime] = React.useState("");
  // ?
  const [currentNeedle, setCurrentNeedle] = React.useState({
    needle: null,
    type: NaN,
  });
  const [checkedAddons, setCheckedAddons] = React.useState({
    injection: false,
    ointment: false,
    coloring: false,
  });
  const [price, setPrice] = React.useState("");

  const title = data && data.title;
  const rawDate = data && data.rawDate;
  const masterName = data && data.master && data.master.name;

  const handleIdleTimePick = (currentTime) => {
    setCurrentIdleTime(currentTime);
  };

  const isEnteredDurationCorrect = React.useMemo(() => {
    return (
      duration.length === 13 &&
      duration.split(" - ")[0] !== duration.split(" - ")[1] &&
      timeCompare(duration.split(" - ")[0], duration.split(" - ")[1]) &&
      timeCompare(currentIdleTime.start, duration.split(" - ")[0]) &&
      timeCompare(duration.split(" - ")[1], currentIdleTime.finish)
    );
  }, [duration]);

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
        if (parseInt(data.title[i]) || parseInt(data.title[i]) === 0)
          currentDay += data.title[i];
      }

      axios
        .get(`/masters/${data.master.id}/idle/${currentDay}`)
        .then(({ data }) => setIdleTime(data.idle))
        .catch((err) => console.log(err));
    }
  }, [visible]);

  const handleClientPick = React.useCallback(
    (currentClient) => {
      setCurrentClient(currentClient);
    },
    [currentClient]
  );

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
          <Form
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

export default AddAppointmentModel;
