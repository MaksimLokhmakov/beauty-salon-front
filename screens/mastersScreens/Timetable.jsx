import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Context } from "../../context";
import {
  Table,
  SearchBar,
  AddTimeTableModal,
  Label,
  AddAppointmentModel,
  PureListAnimation,
} from "../../components";
import Screen from "../style";
import not_found from "../../assets/lottie/not_found.json";

const Timetable = () => {
  const { getTimeTable, timeTable, setVisibleAddTimetableModal } =
    React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [reductItem, setReductItem] = React.useState(false);
  const [currentModalProps, setCurrentModalProps] = React.useState();
  const [visibleAppointmentsModal, setVisibleAppointmentsModel] =
    React.useState(false);
  React.useEffect(() => {
    onRefresh();
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
    if (item.title.toLowerCase().includes(searchValue.toLowerCase()))
      return true;
    return false;
  };
  const getKey = (item) => item.title;
  const hideAddModal = (value) => setVisibleAppointmentsModel(value);
  const openModel = () => setVisibleAppointmentsModel(true);
  const onPressLabel = React.useCallback((item) => {
    setCurrentModalProps(item);
    openModel();
  }, []);
  const getItemToRender = ({ item }) => {
    const title = item.title;
    const rawDate = item.rawDate;

    const tableItemData = item.masters.map((item) => {
      const modalProps = {
        title: title,
        rawDate: rawDate,
        master: item.master,
      };
      return {
        label: (
          <Label touchable onPress={onPressLabel} data={modalProps}>
            {item.master.name}
          </Label>
        ),
        value: <Text>{item.start + " - " + item.finish}</Text>,
      };
    });

    const tableData = {
      title: title,
      data: tableItemData,
    };

    return (
      <View style={[Screen.infoCardWrapper, timeTableStyle.tableWrapperStyle]}>
        <Table
          editable
          onEdit={getEditDay}
          tableValues={tableData}
          item={item}
        />
      </View>
    );
  };

  const filtredData = timeTable.filter((item) => onSearch(item));

  return (
    <View style={[Screen.wrapper, timeTableStyle.wrapperColor]}>
      <View style={timeTableStyle.searchWrapper}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </View>

      {filtredData.length === 0 && searchValue.length !== 0 ? (
        <PureListAnimation
          animation={not_found}
          titleText={"Нет результатов."}
          secondaryText={`По запросу «${searchValue}» ничего не найдено.`}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={timeTableStyle.flatListStyle}
          onRefresh={onRefresh}
          refreshing={isLoading}
          data={filtredData}
          keyExtractor={getKey}
          renderItem={getItemToRender}
          initialNumToRender={15}
        />
      )}

      <AddAppointmentModel
        visible={visibleAppointmentsModal}
        onClose={hideAddModal}
        data={currentModalProps}
      />
      <AddTimeTableModal item={reductItem} setItem={setReductItem} />
    </View>
  );
};

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
