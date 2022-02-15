import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Context } from "../../context";
import Animated, {
  Layout,
  FadeIn,
  FadeOutRight,
} from "react-native-reanimated";
import { Table, SearchBar, AddTimeTableModal } from "../../components";
import Screen from "../style";

const Timetable = () => {
  const { timeTable, getTimeTable } = React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [reductItem, setReductItem] = React.useState(false);

  React.useEffect(() => {
    getTimeTable();
  }, []);

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

  // !  отсюда будет происходить добавление
  const label = (masterName) => (
    <TouchableOpacity>
      <Text style={{ color: "#C2185B" }}>{masterName}</Text>
    </TouchableOpacity>
  );

  function formatDateToH2dM2d(date, locale = "ru") {
    return date.toLocaleString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <View
      style={{
        ...Screen.wrapper,
        backgroundColor: "#f1f3f4",
      }}
    >
      <View style={{ paddingBottom: 10, backgroundColor: "#fff" }}>
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </View>
      <Animated.FlatList
        itemLayoutAnimation={Layout.springify()}
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 20 }}
        onRefresh={onRefresh}
        refreshing={isLoading}
        data={timeTable.filter((item) => onSearch(item))}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => {
          const NUMBER_OF_ROWS = item.fourthMaster
            ? 4
            : item.thirdMaster
            ? 3
            : item.secondMaster
            ? 2
            : false;

          return (
            item.firstMaster && (
              <Animated.View
                entering={FadeIn.delay(450 + 50 * index)}
                exiting={FadeOutRight}
                style={{
                  ...Screen.infoCardWrapper,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                <Table
                  editable
                  item={item}
                  onEdit={setReductItem}
                  title={item.title}
                  numberOfRows={NUMBER_OF_ROWS}
                  firstLabel={() =>
                    item.firstMaster && label(item.firstMaster.name)
                  }
                  secondLabel={() =>
                    item.secondMaster && label(item.secondMaster.name)
                  }
                  thirdLabel={() =>
                    item.thirdMaster && label(item.thirdMaster.name)
                  }
                  fourthLabel={() =>
                    item.fourthMaster && label(item.fourthMaster.name)
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
              </Animated.View>
            )
          );
        }}
      />

      <AddTimeTableModal item={reductItem} setItem={setReductItem} />
    </View>
  );
};

export default Timetable;
