import React from "react";
import {
  View,
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../../../context";
import Table from "../../Table";
import MadalHeader from "../../ModalHeader";
import SearchBar from "../../SearchBar";
import style from "../style";

const AddTimeTableModal = () => {
  const {
    visibleAddTimetableModal,
    setVisibleAddTimetableModal,
    masters,
    setTimeTable,
    getTimeTable,
  } = React.useContext(Context);
  const [emptyDays, setEmptyDays] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [pickingDate, setPickingDate] = React.useState(true);
  const [pickingMasters, setPickingMasters] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Данные объекта формы
  const [date, setDate] = React.useState({});
  const [firstMaster, setFirstMaster] = React.useState({});
  const [secondMaster, setSecondMaster] = React.useState({});
  const [thirdMaster, setThirdMaster] = React.useState({});
  const [fourthMaster, setFourthMaster] = React.useState({});

  const [firstInputValue, setFirstInputValue] = React.useState("");
  const [secondInputValue, setSecondInputValue] = React.useState("");
  const [thirdInputValue, setThirdInputValue] = React.useState("");
  const [fourthInputValue, setFourthInputValue] = React.useState("");

  const [masterNumber, setMasterNumber] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    getEmptyDays();
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    setDate(emptyDays[0]);
  }, [emptyDays]);

  const nullifyForm = () => {
    setDate({});
    setPickingDate(true);
    setFirstInputValue("");
    setSecondInputValue("");
    setThirdInputValue("");
    setFourthInputValue("");
    setFirstMaster({});
    setSecondMaster({});
    setThirdMaster({});
    setFourthMaster({});
    setMasterNumber(1);
    setDate({});
    setPickingDate(true);
  };

  const requests = async () => {
    if (Object.keys(firstMaster).length !== 0) {
      const first = await axios
        .put(`masters/${firstMaster.id}/timetable`, {
          date: date.rowDate,
          start: firstInputValue.split(" - ")[0],
          finish: firstInputValue.split(" - ")[1],
        })
        .then(() => console.log("OK"))
        .catch((e) => console.log(e));
    }
    if (Object.keys(secondMaster).length !== 0) {
      const second = await axios
        .put(`masters/${secondMaster.id}/timetable`, {
          date: date.rowDate,
          start: secondInputValue.split(" - ")[0],
          finish: secondInputValue.split(" - ")[1],
        })
        .then(() => console.log("OK"))
        .catch((e) => console.log(e));
    }
    if (Object.keys(thirdMaster).length !== 0) {
      const third = await axios
        .put(`masters/${thirdMaster.id}/timetable`, {
          date: date.rowDate,
          start: thirdInputValue.split(" - ")[0],
          finish: thirdInputValue.split(" - ")[1],
        })
        .then(() => console.log("OK"))
        .catch((e) => console.log(e));
    }
    if (Object.keys(fourthMaster).length !== 0) {
      const fourth = await axios
        .put(`masters/${fourthMaster.id}/timetable`, {
          date: date.rowDate,
          start: fourthInputValue.split(" - ")[0],
          finish: fourthInputValue.split(" - ")[1],
        })
        .then(() => console.log("OK"))
        .catch((e) => console.log(e));
    }
    return;
  };

  const onSubmit = () => {
    // setTimeTable((prev) => [
    //   ...prev,
    //   {
    //     title: date.title,
    //     rowDate: date.rowDate,
    //     firstMaster:
    //       Object.keys(firstMaster).length !== 0
    //         ? {
    //             name: firstMaster.name,
    //             start: firstInputValue.split(" - ")[0],
    //             finish: firstInputValue.split(" - ")[1],
    //           }
    //         : null,
    //     secondMaster:
    //       Object.keys(secondMaster).length !== 0
    //         ? {
    //             name: secondMaster.name,
    //             start: secondInputValue.split(" - ")[0],
    //             finish: secondInputValue.split(" - ")[1],
    //           }
    //         : null,
    //     thirdMaster:
    //       Object.keys(thirdMaster).length !== 0
    //         ? {
    //             name: thirdMaster.name,
    //             start: thirdInputValue.split(" - ")[0],
    //             finish: thirdInputValue.split(" - ")[1],
    //           }
    //         : null,
    //     fourthMaster:
    //       Object.keys(fourthMaster).length !== 0
    //         ? {
    //             name: fourthMaster.name,
    //             start: fourthInputValue.split(" - ")[0],
    //             finish: fourthInputValue.split(" - ")[1],
    //           }
    //         : null,
    //   },
    // ]);
    setEmptyDays((prev) =>
      prev.filter((item) => item.rowDate !== date.rowDate)
    );
    setVisibleAddTimetableModal(false);
    requests();
    getTimeTable();
    nullifyForm();
  };

  const getEmptyDays = () => {
    axios
      .get("masters/timetable/empty")
      .then(({ data }) => setEmptyDays(data))
      .catch((e) => console.log(e));
  };
  const Line = (
    <View
      style={{
        width: "100%",
        height: 0.5,
        backgroundColor: "#8b979f",
      }}
    />
  );
  const pickMaster = (setMaster, current) => {
    setMaster((prev) => {
      if (prev === current) return {};
      return current;
    });
  };
  const checkPickedElement = (item) => {
    return (
      item === date ||
      item === firstMaster ||
      item === secondMaster ||
      item === thirdMaster ||
      item === fourthMaster
    );
  };
  const TableLabel = (masterName, masterNumber) => (
    <TouchableOpacity
      onPress={() => {
        setPickingMasters(true);
        setMasterNumber(masterNumber);
      }}
    >
      <Text style={{ fontSize: 15, color: "#1976D2", top: 1 }}>
        {masterName ? masterName : "Мастер не выбран"}
      </Text>
    </TouchableOpacity>
  );
  const TableValue = (value, setValue, number) => {
    return (
      <TextInput
        autoFocus={masterNumber === number && true}
        value={value}
        onChangeText={(e) => setValue(e)}
        placeholder="$$:$$ - $$:$$"
      />
    );
  };
  const hidePickingDate = () => {
    setPickingDate(false);
    setPickingMasters(true);
  };
  const onComplete = () => {
    if (pickingMasters) return setPickingMasters(false);
    if (pickingDate) return hidePickingDate();
    if (!pickingDate && !pickingMasters) return onSubmit();
  };

  return (
    <Modal
      visible={visibleAddTimetableModal}
      animationType="slide"
      transparent={false}
    >
      <View style={{ ...style.wrapper, paddingHorizontal: 20 }}>
        <MadalHeader
          onBack={setVisibleAddTimetableModal}
          onComplete={() => onComplete()}
          canBeAdded={() => true}
          headerText={() => ""}
          rigthButton={pickingDate ? "Выбрать" : "Добавить"}
        />

        {pickingDate || pickingMasters ? (
          <>
            <View style={{ width: "100%" }}>
              <SearchBar
                value={searchValue}
                setValue={setSearchValue}
                styleWrapper={{
                  paddingTop: 0,
                  width: "105%",
                  right: "2.5%",
                }}
                styleInput={{ width: "100%" }}
              />
            </View>
            <FlatList
              style={{ paddingTop: 10 }}
              showsVerticalScrollIndicator={false}
              data={
                pickingDate
                  ? emptyDays.filter((item) => item.title.includes(searchValue))
                  : masters.filter((item) => item.name.includes(searchValue))
              }
              keyExtractor={(item) => (pickingDate ? item.rowDate : item.id)}
              ItemSeparatorComponent={() => Line}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (pickingMasters) {
                      return masterNumber === 1
                        ? pickMaster(setFirstMaster, item)
                        : masterNumber === 2
                        ? pickMaster(setSecondMaster, item)
                        : masterNumber === 3
                        ? pickMaster(setThirdMaster, item)
                        : pickMaster(setFourthMaster, item);
                    }
                    setDate(item);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      height: 40,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        borderColor: checkPickedElement(item)
                          ? "#5bdd8f"
                          : "#8b979f",
                        borderWidth: 1,
                        width: 20,
                        height: 20,
                        backgroundColor: checkPickedElement(item)
                          ? "#5bdd8f"
                          : "#fff",
                        borderRadius: 40,
                        marginRight: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome5
                        style={{ top: 0.5 }}
                        name="check"
                        size={11}
                        color="#fff"
                      />
                    </View>

                    <Text>{pickingMasters ? item.name : item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <Table
            numberOfRows={4}
            title={date.title}
            firstLabel={() => TableLabel(firstMaster.name, 1)}
            secondLabel={() => TableLabel(secondMaster.name, 2)}
            thirdLabel={() => TableLabel(thirdMaster.name, 3)}
            fourthLabel={() => TableLabel(fourthMaster.name, 4)}
            firstValue={() =>
              TableValue(firstInputValue, setFirstInputValue, 1)
            }
            secondValue={() =>
              TableValue(secondInputValue, setSecondInputValue, 2)
            }
            thirdValue={() =>
              TableValue(thirdInputValue, setThirdInputValue, 3)
            }
            fourthValue={() =>
              TableValue(fourthInputValue, setFourthInputValue, 4)
            }
          />
        )}
      </View>
    </Modal>
  );
};

export default AddTimeTableModal;
