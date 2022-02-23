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

  const initialTimetableData = {
    date: {},
    data: [],
  };

  const [addTimeTableData, setAddTimeTableData] =
    React.useState(initialTimetableData);

  const deleteMasterFromTimeTable = (master) => {
    setMastersList((prev) => [...prev, master]);
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
            <CheckBox colored={true} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPickingMasters(true);
              setPickedMaster({ master: item.master, index: index });
            }}
          >
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
    setPickingMasters(false);
    setPickingDate(true);
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

    // requests();
    // getTimeTable();
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
      return setPickingMasters(false);
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

  const onPickMaster = (currentItem) => {
    setMastersList((prev) =>
      prev.filter((master) => master.id !== currentItem.id)
    );
    setAddTimeTableData((prev) => {
      const newData = [
        ...prev.data,
        { master: currentItem, start: "", finish: "", inputValue: "" },
      ];

      return {
        date: prev.date,
        data: newData,
      };
    });
  };

  const pickedObject = pickingMasters
    ? pickedMaster.master
    : addTimeTableData.date;
  const onPress = pickingDate ? onPickDate : onPickMaster;

  const getRenderItem = ({ item }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <AddItemConteiner
        item={item}
        pickedObject={pickedObject}
        pickingDate={pickingDate}
        onPress={onPress}
      />
    </Animated.View>
  );
  const getKey = (item) => (pickingDate ? item.rowDate : item.id);
  // const filteredData = pickingDate
  //   ? emptyDays.filter((item) => item.title.includes(searchValue))
  //   : mastersList.filter((item) => item.name.includes(searchValue));

  const filtredEmptyDays = emptyDays.filter((item) =>
    item.title.includes(searchValue)
  );

  const filteredMatsersList = mastersList.filter((item) =>
    item.name.includes(searchValue)
  );

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
            <View style={addTableStyle.fullWidth}>
              <SearchBar
                value={searchValue}
                setValue={setSearchValue}
                styleWrapper={addTableStyle.searchBarWrapper}
                styleInput={addTableStyle.fullWidth}
              />
            </View>

            <Animated.FlatList
              style={addTableStyle.paddingTopTen}
              data={filtredEmptyDays}
              keyExtractor={getKey}
              renderItem={getRenderItem}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View>
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

            {/* <TouchableOpacity onPress={addMasterToTimetable}>
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
            </TouchableOpacity> */}
            <Animated.FlatList
              itemLayoutAnimation={Layout}
              style={addTableStyle.paddingTopTen}
              data={filteredMatsersList}
              keyExtractor={getKey}
              renderItem={getRenderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddTimeTableModal;
