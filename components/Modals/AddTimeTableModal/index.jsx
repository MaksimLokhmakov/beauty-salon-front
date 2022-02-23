import React from "react";
import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";
import AddItemConteiner from "../../shared/AddItemConteiner";
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
    setTimeTable,
    getTimeTable,
  } = React.useContext(Context);
  const [emptyDays, setEmptyDays] = React.useState([]);

  const [pickedMaster, setPickedMaster] = React.useState({
    master: {},
    index: "",
  });

  const [mastersList, setMastersList] = React.useState(masters);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pickingDate, setPickingDate] = React.useState(true);
  const [pickingMasters, setPickingMasters] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const [time, setTime] = React.useState("");

  const [addTimeTableData, setAddTimeTableData] = React.useState({
    date: { title: "", rowDate: "" },
    data: [
      {
        master: { id: Math.random(), name: "выбрать мастера" },
        start: "",
        finish: "",
        inputValue: "",
      },
    ],
  });

  const deleteMasterFromTimeTable = (master) => {
    setMastersList((prev) => [master, ...prev]);
    setAddTimeTableData((prev) => {
      const newMasters = prev.data.filter(
        (item) => item.master.id !== master.id
      );
      return {
        date: prev.date,
        data: newMasters,
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
      const newData = prev.data.map((item, currentIndex) => {
        if (currentIndex === index) {
          item.inputValue = e;
        }
        return item;
      });

      return {
        date: prev.date,
        data: newData,
      };
    });
  };

  const tableData = addTimeTableData.data.map((item, index) => {
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
            <MaterialIcons name="do-not-disturb-on" size={24} color="#fe3c30" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPickingMasters(true);
              setPickedMaster({ master: item.master, index: index });
            }}
          >
            <Text style={{ color: "#097fff", fontSize: 15 }}>
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
    setIsLoading(true);
    getEmptyDays();
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    if (item === false)
      setAddTimeTableData((prev) => {
        return {
          date: emptyDays[0],
          data: prev.data,
        };
      });
    getTimeTable();
  }, [emptyDays]);

  const nullifyForm = () => {
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
  const hidePickingDate = () => {
    setPickingDate(false);
  };
  const onComplete = () => {
    if (pickingMasters) {
      setPickingMasters(false);
      setMastersList((prev) =>
        prev.filter((master) => master.id !== pickedMaster.master.id)
      );
      setAddTimeTableData((prev) => {
        const newData = prev.data.map((item, index) => {
          if (index === pickedMaster.index) item.master = pickedMaster.master;
          return item;
        });

        return {
          date: prev.date,
          data: newData,
        };
      });
      return;
    }
    if (pickingDate) return hidePickingDate();
    if (!pickingDate && !pickingMasters) return onSubmit();
  };
  const onBack = (value) => {
    setVisibleAddTimetableModal(value);
    nullifyForm();
    item && setItem(false);
  };

  const onPickDate = (item) => {
    setAddTimeTableData((prev) => {
      return {
        date: item,
        data: prev.data,
      };
    });
  };

  const onPickMaster = (item) => {
    setPickedMaster((prev) => {
      return {
        master: item,
        index: prev.index,
      };
    });
  };

  const pickedObject = pickingMasters
    ? pickedMaster.master
    : addTimeTableData.date;
  const onPress = pickingMasters ? onPickMaster : onPickDate;

  const getRenderItem = ({ item }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <AddItemConteiner
        item={item}
        pickedObject={pickedObject}
        pickingMasters={pickingMasters}
        onPress={onPress}
      />
    </Animated.View>
  );
  const getKey = (item) => (pickingDate ? item.rowDate : item.id);
  const filteredData = pickingDate
    ? emptyDays.filter((item) => item.title.includes(searchValue))
    : mastersList.filter((item) => item.name.includes(searchValue));

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
      <View style={[style.wrapper, addTableStyle.wrapper]}>
        <MadalHeader
          onBack={onBack}
          onComplete={() => onComplete()}
          canBeAdded={() => true}
          headerText={() => ""}
          rigthButton={pickingDate ? "Выбрать" : "Применить"}
        />

        {pickingDate || pickingMasters ? (
          <>
            <View style={addTableStyle.fullWidth}>
              <SearchBar
                value={searchValue}
                setValue={setSearchValue}
                styleWrapper={addTableStyle.searchBarWrapper}
                styleInput={addTableStyle.fullWidth}
              />
            </View>

            <Animated.FlatList
              itemLayoutAnimation={Layout}
              style={addTableStyle.paddingTopTen}
              data={filteredData}
              keyExtractor={getKey}
              renderItem={getRenderItem}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View>
            <Table tableValues={tableAddTimeTableData} />

            <TouchableOpacity onPress={addMasterToTimetable}>
              <Animated.View
                entering={FadeInUp}
                style={[
                  addTableStyle.rowDerection,
                  addTableStyle.buttonConteiner,
                ]}
              >
                <View style={addTableStyle.iconWrapper}>
                  <MaterialIcons name="add-circle" size={24} color="#007afe" />
                </View>
                <View style={addTableStyle.button}>
                  <Text style={addTableStyle.buttonText}>добавить мастера</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddTimeTableModal;
