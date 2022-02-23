import React from "react";
import { View, Text, ScrollView, RefreshControl, Platform } from "react-native";
import { Context } from "../../context";
import { Table, StatisticInfoSection, ModalList } from "../../components";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
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
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <StatisticInfoSection type="day" stat={dayStat} />
            </Animated.View>
          )}
          {reportingPicker === "Месяц" && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <StatisticInfoSection type="month" stat={monthStat} />
            </Animated.View>
          )}

          {reportingPicker === "Мастера" &&
            mastersStat.map((item, index) => {
              const mastersDayInfoTableData = {
                title: "Сегодня: ",
                data: [
                  {
                    label: <Text style={{ color: "#C2185B" }}>время</Text>,
                    value: <Text>{item.dayHours} ч.</Text>,
                  },
                  {
                    label: <Text style={{ color: "#C2185B" }}>прибыль</Text>,
                    value: <Text>{item.dayIncome} руб.</Text>,
                  },
                ],
              };

              const mastersMonthInfoTableData = {
                title: "Месяц:",
                data: [
                  {
                    label: <Text style={{ color: "#C2185B" }}>время</Text>,
                    value: <Text>{item.monthHours} ч.</Text>,
                  },
                  {
                    label: <Text style={{ color: "#C2185B" }}>прибыль</Text>,
                    value: <Text>{item.monthIncome} руб.</Text>,
                  },
                ],
              };
              return (
                <Animated.View
                  entering={FadeIn.delay(50 * index)}
                  exiting={FadeOut}
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
                        backgroundColor="#f1f3f4"
                        tableValues={mastersDayInfoTableData}
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
                        backgroundColor="#f1f3f4"
                        tableValues={mastersMonthInfoTableData}
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
