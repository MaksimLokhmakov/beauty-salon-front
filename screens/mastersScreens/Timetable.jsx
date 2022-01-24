import React from "react";
import { View, Text, FlatList } from "react-native";
import { Context } from "../../context";

import Screen from "../style";
import { Table, SearchBar, AddTimeTableModal } from "../../components";

const Timetable = () => {
  const { timeTable, getTimeTable } = React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  React.useEffect(() => {
    getTimeTable();
  }, []);

  console.log(timeTable);
  const onRefresh = () => {
    setIsLoading(true);
    getTimeTable();
    setIsLoading(false);
  };

  const onSearch = (item) => {
    if (item.title.includes(searchValue)) return true;
    if (item.firstMaster && item.firstMaster.name.includes(searchValue))
      return true;
    if (item.secondMaster && item.secondMaster.name.includes(searchValue))
      return true;
    if (item.thirdMaster && item.thirdMaster.name.includes(searchValue))
      return true;
    if (item.fourthMaster && item.fourthMaster.name.includes(searchValue))
      return true;
    return false;
  };

  function formatDateToH2dM2d(date, locale = "ru") {
    return date.toLocaleString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <View style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}>
      <View style={{ paddingBottom: 10, backgroundColor: "#fff" }}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        data={timeTable.filter((item) => onSearch(item))}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          const NUMBER_OF_ROWS = item.fourthMaster
            ? 4
            : item.thirdMaster
            ? 3
            : item.secondMaster
            ? 2
            : false;

          return (
            item.firstMaster && (
              <View
                style={{
                  ...Screen.infoCardWrapper,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                <Table
                  title={item.title}
                  numberOfRows={NUMBER_OF_ROWS}
                  firstLabel={() => item.firstMaster.name}
                  secondLabel={() =>
                    item.secondMaster && item.secondMaster.name
                  }
                  thirdLabel={() => item.thirdMaster && item.thirdMaster.name}
                  fourthLabel={() =>
                    item.fourthMaster && item.fourthMaster.name
                  }
                  firstValue={() => (
                    <Text>
                      {item.firstMaster.start + " - " + item.firstMaster.finish}
                    </Text>
                  )}
                  secondValue={() => (
                    <Text>
                      {item.secondMaster &&
                        item.secondMaster.start +
                          " - " +
                          item.secondMaster.finish}
                    </Text>
                  )}
                  thirdValue={() => (
                    <Text>
                      {item.thirdMaster &&
                        item.thirdMaster.start +
                          " - " +
                          item.thirdMaster.finish}
                    </Text>
                  )}
                  fourthValue={() => (
                    <Text>
                      {item.fourthMaster &&
                        item.fourthMaster.start +
                          " - " +
                          item.fourthMaster.finish}
                    </Text>
                  )}
                />
              </View>
            )
          );
        }}
      />

      <AddTimeTableModal />
    </View>
  );
};

export default Timetable;
