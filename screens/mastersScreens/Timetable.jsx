import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Context } from "../../context";
import Animated, {
  Layout,
  FadeIn,
  FadeOutRight,
} from "react-native-reanimated";
import { Table, SearchBar, AddTimeTableModal } from "../../components";
import Screen from "../style";

const Timetable = () => {
  const { getTimeTable, timeTable, setVisibleAddTimetableModal } =
    React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [reductItem, setReductItem] = React.useState(false);
  React.useEffect(() => {
    getTimeTable();
  }, []);

  const getEditDay = (day) => {
    setReductItem(day);
    setVisibleAddTimetableModal(true);
  };
  const onRefresh = () => {
    setIsLoading(true);
    getTimeTable();
    setIsLoading(false);
  };
  const onSearch = (item) => {
    if (item.title.includes(searchValue)) return true;
    return false;
  };
  const getKey = (item) => item.title;
  const getItemToRender = ({ item, index }) => {
    const tableItemData = item.masters.map((item) => {
      return {
        label: <Label>{item.master.name}</Label>,
        value: <Text>{item.start + " - " + item.finish}</Text>,
      };
    });
    const tableData = {
      title: item.title,
      data: tableItemData,
    };

    return (
      <Animated.View
        entering={FadeIn.delay(50 * index)}
        exiting={FadeOutRight}
        style={[Screen.infoCardWrapper, timeTableStyle.tableWrapperStyle]}
      >
        <Table
          editable
          onEdit={getEditDay}
          tableValues={tableData}
          item={item}
        />
      </Animated.View>
    );
  };

  const filtredData = timeTable.filter((item) => onSearch(item));

  return (
    <View style={[Screen.wrapper, timeTableStyle.wrapperColor]}>
      <View style={timeTableStyle.searchWrapper}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </View>

      <Animated.FlatList
        itemLayoutAnimation={Layout}
        showsVerticalScrollIndicator={false}
        style={timeTableStyle.flatListStyle}
        onRefresh={onRefresh}
        refreshing={isLoading}
        data={filtredData}
        keyExtractor={getKey}
        renderItem={getItemToRender}
      />

      <AddTimeTableModal item={reductItem} setItem={setReductItem} />
    </View>
  );
};

// *  отсюда будет происходить добавление
const Label = ({ children }) => (
  <TouchableOpacity>
    <Text style={{ color: "#C2185B" }}>{children}</Text>
  </TouchableOpacity>
);

const timeTableStyle = StyleSheet.create({
  searchWrapper: { paddingBottom: 10, backgroundColor: "#fff" },
  flatListStyle: { paddingBottom: 20 },
  tableWrapperStyle: {
    marginTop: 10,
    marginBottom: 0,
  },
  wrapperColor: { backgroundColor: "#f1f3f4" },
});

export default Timetable;
