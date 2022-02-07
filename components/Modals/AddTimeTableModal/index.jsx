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

const AddTimeTableModal = ({ item = false, setItem }) => {
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
    if (item !== false) {
      setPickingDate(false);
      setDate({ rowDate: item.rawDate, title: item.title });
      setFirstMaster({ id: item.firstMaster.id, name: item.firstMaster.name });
      setSecondMaster(
        item.secondMaster
          ? {
              id: item.secondMaster.id,
              name: item.secondMaster.name,
            }
          : {}
      );
      setThirdMaster(
        item.thirdMaster
          ? {
              id: item.thirdMaster.id,
              name: item.thirdMaster.name,
            }
          : {}
      );
      setFourthMaster(
        item.fourthMaster
          ? {
              id: item.fourthMaster.id,
              name: item.fourthMaster.name,
            }
          : {}
      );
      setFirstInputValue(
        item.firstMaster.start + " - " + item.firstMaster.finish
      );
      setSecondInputValue(
        item.secondMaster
          ? item.secondMaster.start + " - " + item.secondMaster.finish
          : ""
      );
      setThirdInputValue(
        item.thirdMaster
          ? item.thirdMaster.start + " - " + item.thirdMaster.finish
          : ""
      );
      setFourthInputValue(
        item.fourthMaster
          ? item.fourthMaster.start + " - " + item.fourthMaster.finish
          : ""
      );
    }
  }, [item]);
  React.useEffect(() => {
    if (item === false) setDate(emptyDays[0]);
    getTimeTable();
  }, [emptyDays]);

  const nullifyForm = () => {
    setDate({});
    setFirstInputValue("");
    setSecondInputValue("");
    setThirdInputValue("");
    setFourthInputValue("");
    setFirstMaster({});
    setSecondMaster({});
    setThirdMaster({});
    setFourthMaster({});
    setMasterNumber(1);
    setPickingMasters(false);
    setPickingDate(true);
  };

  const requests = async () => {
    return await axios
      .put("/masters/timetable", {
        rawDate: date.rowDate,
        firstMaster:
          Object.keys(firstMaster).length !== 0
            ? {
                id: firstMaster.id,
                start: firstInputValue.split(" - ")[0],
                finish: firstInputValue.split(" - ")[1],
              }
            : null,
        secondMaster:
          Object.keys(secondMaster).length !== 0
            ? {
                id: secondMaster.id,
                start: secondInputValue.split(" - ")[0],
                finish: secondInputValue.split(" - ")[1],
              }
            : null,
        thirdMaster:
          Object.keys(thirdMaster).length !== 0
            ? {
                id: thirdMaster.id,
                start: thirdInputValue.split(" - ")[0],
                finish: thirdInputValue.split(" - ")[1],
              }
            : null,
        fourthMaster:
          Object.keys(fourthMaster).length !== 0
            ? {
                id: fourthMaster.id,
                start: fourthInputValue.split(" - ")[0],
                finish: fourthInputValue.split(" - ")[1],
              }
            : null,
      })
      .then(() => console.log("YES"))
      .catch((e) => console.log(e));
  };

  const onSubmit = () => {
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
      if (prev.id === current.id) {
        if (masterNumber === 1) setFirstInputValue("");
        if (masterNumber === 2) setSecondInputValue("");
        if (masterNumber === 3) setThirdInputValue("");
        if (masterNumber === 4) setFourthInputValue("");
        return {};
      }
      return current;
    });
  };
  const checkPickedElement = (item) => {
    if (item.rowDate) return item.title === date.title;
    return (
      item.id === firstMaster.id ||
      item.id === secondMaster.id ||
      item.id === thirdMaster.id ||
      item.id === fourthMaster.id
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
        placeholder="00:00 - 00:00"
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

  const onBack = (value) => {
    setVisibleAddTimetableModal(value);
    nullifyForm();
    item && setItem(false);
  };

  return (
    <Modal
      visible={visibleAddTimetableModal}
      animationType="slide"
      transparent={false}
    >
      <View style={{ ...style.wrapper, paddingHorizontal: 20 }}>
        <MadalHeader
          onBack={onBack}
          onComplete={() => onComplete()}
          canBeAdded={() => true}
          headerText={() => ""}
          rigthButton={pickingDate ? "Выбрать" : "Применить"}
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
