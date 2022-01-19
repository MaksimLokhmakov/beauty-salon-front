import React from "react";
import { View, Text, FlatList } from "react-native";
import { Context } from "../../context";

import Screen from "../style";
import { Table, SearchBar } from "../../components";

const Timetable = () => {
  const { timeTable, getTimeTable } = React.useContext(Context);
  React.useEffect(() => {
    getTimeTable();
  }, []);
  console.log(timeTable);

  return (
    <View style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}>
      <View style={{ paddingBottom: 10, backgroundColor: "#fff" }}>
        <SearchBar />
      </View>
      <FlatList
        data={timeTable}
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
                firstLabel={item.firstMaster.name}
                secondLabel={item.secondMaster && item.secondMaster.name}
                thirdLabel={item.thirdMaster && item.thirdMaster.name}
                fourthLabel={item.fourthMaster && item.fourthMaster.name}
                firstValue={() => (
                  <Text>
                    {item.firstMaster.start + "-" + item.firstMaster.finish}
                  </Text>
                )}
                secondValue={() => (
                  <Text>
                    {item.secondMaster &&
                      item.secondMaster.start + "-" + item.secondMaster.finish}
                  </Text>
                )}
                thirdValue={() => (
                  <Text>
                    {item.thirdMaster &&
                      item.thirdMaster.start + "-" + item.thirdMaster.finish}
                  </Text>
                )}
                fourthValue={() => (
                  <Text>
                    {item.fourthMaster &&
                      item.fourthMaster.start + "-" + item.fourthMaster.finish}
                  </Text>
                )}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Timetable;
