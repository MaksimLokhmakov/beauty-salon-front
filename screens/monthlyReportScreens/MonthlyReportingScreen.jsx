import React from "react";
import { View, Text, ScrollView, RefreshControl, Platform } from "react-native";
import { Context } from "../../context";
import { Table, StatisticInfoSection, ModalList } from "../../components";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import Screen from "../style";

const MonthlyReportingScreen = () => {
  const {
    pickerStatVisible,
    setPickerStatVisible,
    dayStat,
    monthStat,
    mastersStat,
    getFullStat,
  } = React.useContext(Context);
  const [refreshing, setRefreshing] = React.useState(false);
  const [reportingPicker, setReportingPicker] = React.useState("День");

  const onRefresh = () => {
    setRefreshing(true);
    getFullStat();
    setRefreshing(false);
  };

  const onPressListItem = (value) => {
    setReportingPicker(value);
    setPickerStatVisible(false);
  };

  const list = [{ name: "День" }, { name: "Месяц" }, { name: "Мастера" }];

  return (
    <>
      <ScrollView
        contentContainerStyle={
          Platform.OS === "android" && Screen.androidPaddingTop
        }
        showsVerticalScrollIndicator={false}
        style={{ ...Screen.wrapper, backgroundColor: "#ebecef" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {reportingPicker === "День" && (
            <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
              <StatisticInfoSection type="day" stat={dayStat} />
            </Animated.View>
          )}
          {reportingPicker === "Месяц" && (
            <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
              <StatisticInfoSection type="month" stat={monthStat} />
            </Animated.View>
          )}

          {reportingPicker === "Мастера" &&
            mastersStat.map((item, index) => {
              return (
                <Animated.View
                  entering={FadeInUp.delay(50 * index)}
                  exiting={FadeOutDown}
                  key={item.master.id}
                  style={{
                    ...Screen.infoCardWrapper,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, marginLeft: 10 }}
                  >
                    {item.master.name}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        ...Screen.infoCardWrapper,
                        backgroundColor: "#f1f3f4",
                        marginRight: 5,
                        paddingHorizontal: 20,
                      }}
                    >
                      <Table
                        title={`Сегодня:`}
                        backgroundColor="#f1f3f4"
                        numberOfRows={2}
                        firstLabel={() => "время"}
                        secondLabel={() => "прибыль"}
                        firstValue={() => <Text>{item.dayHours} ч.</Text>}
                        secondValue={() => <Text>{item.dayIncome} руб.</Text>}
                      />
                    </View>
                    <View
                      style={{
                        ...Screen.infoCardWrapper,
                        backgroundColor: "#f1f3f4",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Table
                        title="Месяц:"
                        backgroundColor="#f1f3f4"
                        numberOfRows={2}
                        firstLabel={() => "время"}
                        secondLabel={() => "прибыль"}
                        firstValue={() => <Text>{item.monthHours} ч.</Text>}
                        secondValue={() => <Text>{item.monthIncome} руб.</Text>}
                      />
                    </View>
                  </View>
                </Animated.View>
              );
            })}
        </View>
      </ScrollView>
      <ModalList
        sortValue={reportingPicker}
        list={list}
        visible={pickerStatVisible}
        onPressListItem={onPressListItem}
      />
    </>
  );
};

export default MonthlyReportingScreen;
