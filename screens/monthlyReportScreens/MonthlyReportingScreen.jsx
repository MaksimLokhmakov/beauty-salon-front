import React from "react";
import { View, ScrollView, RefreshControl, Platform } from "react-native";
import { Context } from "../../context";
import {
  StatisticInfoSection,
  ModalList,
  MasterBlock,
} from "../../components";
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
        showsVerticalScrollIndicator={false}
        style={{ ...Screen.wrapper, backgroundColor: "#ebecef" }}
        contentContainerStyle={
          Platform.OS === "android" && Screen.androidPaddingTop
        }
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
            mastersStat.map((item, index) => (
              <MasterBlock key={item.master.id} item={item} index={index} />
            ))}
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
