import React from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView } from "react-native";
import Animated, {
  Layout,
  FadeIn,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import MaskInput from "react-native-mask-input";
import axios from "axios";
import { Context } from "../../../context";
import Table from "../../shared/Table";
import MadalHeader from "../../shared/ModalHeader";
import SearchBar from "../../shared/SearchBar";
import AddItemConteiner from "../../shared/AddItemConteiner";
import CheckBox from "../../shared/CheckBox";
import style from "../style";
import addTableStyle from "./style";
import Screen from "../../../screens/style";

// TODO:  ВЫБОР ДАТЫ ! ГОТОВО
// TODO:  ВЫБОР МАСТЕРА
// TODO:  ВВОД ВРЕМЕНИ РАБОТЫ МАСТЕРА
// TODO:
// TODO:

const AddTimeTableModal = ({ item = false, setItem }) => {
  const {
    visibleAddTimetableModal,
    setVisibleAddTimetableModal,
    masters,
    timeTable,
    setTimeTable,
    getTimeTable,
  } = React.useContext(Context);
  const [emptyDays, setEmptyDays] = React.useState([]);

  const [mastersList, setMastersList] = React.useState(masters);
  const [pickingDate, setPickingDate] = React.useState(false);

  const initialTimetableData = {
    date: {},
    masters: [],
  };

  const [addTimeTableData, setAddTimeTableData] =
    React.useState(initialTimetableData);

  React.useEffect(() => {
    setAddTimeTableData({
      date: {
        rowDate: item.rawDate,
        title: item.title,
      },
      masters: item.masters ? item.masters : [],
    });
  }, [visibleAddTimetableModal]);

  const deleteMasterFromTimeTable = (master) => {
    setMastersList((prev) => [...prev, master]);
    setAddTimeTableData((prev) => {
      const newMasters = prev.masters.filter(
        (item) => item.master.id !== master.id
      );
      return {
        date: prev.date,
        masters: newMasters,
      };
    });
  };

  const inputMask = [
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
  const handleChangeInput = (e, index) => {
    setAddTimeTableData((prev) => {
      const newData = prev.masters.map((item, currentIndex) => {
        if (currentIndex === index) {
          item.inputValue = e;
          item.start = item.inputValue.split(" - ")[0];
          item.finish = item.inputValue.split(" - ")[1];
        }
        return item;
      });

      return {
        date: prev.date,
        masters: newData,
      };
    });
  };

  const tableData = addTimeTableData.masters.map((item, index) => {
    return {
      label: (
        <View
          style={{
            ...addTableStyle.rowDerection,
            minWidth: 170,
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            onPress={() => deleteMasterFromTimeTable(item.master)}
            style={{
              ...addTableStyle.iconWrapper,
            }}
          >
            <CheckBox />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "#212", fontSize: 15 }}>
              {item.master.name}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      value: (
        <View style={{ paddingVertical: 8 }}>
          <MaskInput
            style={{ fontSize: 15 }}
            value={item.inputValue}
            onChangeText={(e) => handleChangeInput(e, index)}
            keyboardType="numeric"
            autoFocus
            mask={inputMask}
          />
        </View>
      ),
    };
  });

  const tableAddTimeTableData = {
    title: addTimeTableData.date && addTimeTableData.date.title,
    data: tableData,
  };

  React.useEffect(() => {
    getEmptyDays();
  }, []);

  const nullifyForm = () => {
    setMastersList(masters);
    setAddTimeTableData(initialTimetableData);
  };

  const requests = async () => {
    return await axios
      .put("/masters/timetable", {
        rawDate: addTimeTableData.date.rowDate,
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
      prev.filter((item) => item.rowDate !== addTimeTableData.date.rowDate)
    );
    setVisibleAddTimetableModal(false);

    setTimeTable((prev) =>
      prev.map((day) => {
        if (day.rawDate === addTimeTableData.date.rowDate) {
          day.masters = addTimeTableData.masters;
        }

        return day;
      })
    );

    nullifyForm();
  };

  const getEmptyDays = () => {
    axios
      .get("masters/timetable/empty")
      .then(({ data }) => setEmptyDays(data))
      .catch((e) => console.log(e));
  };
  const hidePickingDate = () => {
    setPickingDate(false);
  };
  const onComplete = () => (pickingDate ? hidePickingDate() : onSubmit());

  const onBack = (value) => {
    setVisibleAddTimetableModal(value);
    nullifyForm();
  };

  const onPickDate = (item) => {
    setAddTimeTableData((prev) => {
      return {
        date: item,
        masters: prev.masters,
      };
    });
  };

  const onPickMaster = React.useCallback((currentItem) => {
    setMastersList((prev) =>
      prev.filter((master) => master.id !== currentItem.id)
    );
    setAddTimeTableData((prev) => {
      const newData = [
        ...prev.masters,
        { master: currentItem, start: "", finish: "", inputValue: "" },
      ];

      return {
        date: prev.date,
        masters: newData,
      };
    });
  }, []);

  const pickedObject = addTimeTableData.date;
  const onPress = onPickMaster;

  const getRenderItem = ({ item, index }) => {
    return (
      <Animated.View entering={FadeIn}>
        <AddItemConteiner
          item={item}
          pickedObject={pickedObject}
          pickingDate={pickingDate}
          onPress={onPress}
        />
      </Animated.View>
    );
  };
  const getKey = (item) => (pickingDate ? item.rowDate : item.id);

  const addMasterToTimetable = () => {
    setAddTimeTableData((prev) => {
      return {
        date: prev.date,
        data: [
          ...prev.data,
          {
            master: {
              id: Math.random(),
              name: "выбрать мастера",
            },
            start: "",
            finish: "",
            inputValue: "",
          },
        ],
      };
    });
  };

  return (
    <Modal
      visible={visibleAddTimetableModal}
      animationType="slide"
      transparent={false}
    >
      <View
        style={[
          style.wrapper,
          addTableStyle.wrapper,
          { backgroundColor: "#f1f3f4" },
        ]}
      >
        <MadalHeader
          onBack={onBack}
          onComplete={() => onComplete()}
          canBeAdded={() => true}
          headerText={() => ""}
          rigthButton={pickingDate ? "Выбрать" : "Применить"}
        />

        {pickingDate ? (
          <>
            <Animated.FlatList
              style={addTableStyle.paddingTopTen}
              data={emptyDays}
              keyExtractor={getKey}
              renderItem={getRenderItem}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={{ maxHeight: "100%" }}>
            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 15,
                paddingHorizontal: 15,
                paddingTop: 15,
              }}
            >
              <Table
                tableValues={tableAddTimeTableData}
                backgroundColor="#fff"
              />
            </View>

            <View
              style={{
                marginTop: 10,
                backgroundColor: "#ffffff",
                borderRadius: 15,
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  width: "100%",
                  fontSize: 16,
                  color: "#212121",
                  marginBottom: 10,
                }}
              >
                Мастера
              </Text>
              <View>
                {mastersList.map((item, index) => {
                  const lastElement =
                    !pickingDate && index === mastersList.length - 1;
                  return (
                    <Animated.View key={getKey(item)} entering={FadeIn}>
                      <AddItemConteiner
                        item={item}
                        pickedObject={pickedObject}
                        pickingDate={pickingDate}
                        onPress={onPress}
                        lastElement={lastElement}
                      />
                    </Animated.View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddTimeTableModal;
