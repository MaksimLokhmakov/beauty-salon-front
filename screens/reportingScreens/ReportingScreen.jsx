import { ScrollView, Text, View } from "react-native";
import React from "react";
import { ModalList, StatisticInfoSection } from "../../components";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { Context } from "../../context";

export default function ReportingScreen() {
  const {
    pickerStatVisible,
    setPickerStatVisible,
    monthStat,
    dayStat,
    mastersStat,
    getFullStat,
  } = React.useContext(Context);
  const [pickerValue, setPickerValue] = React.useState();

  const handlePressListItem = (currentValue) => {
    setPickerValue(currentValue);
    setPickerStatVisible(false);
  };

  const list = [{ name: "День" }, { name: "Месяц" }, { name: "Мастера" }];

  return (
    <ScrollView>
      <View>
        {pickerValue === "День" && (
          <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
            <Text>День</Text>
          </Animated.View>
        )}
        {pickerValue === "Месяц" && (
          <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
            <Text>Месяц</Text>
          </Animated.View>
        )}
        {pickerValue === "Мастера" && (
          <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
            <Text>Мастера</Text>
          </Animated.View>
        )}
      </View>

      <ModalList
        sortValue={pickerValue}
        list={list}
        visible={pickerStatVisible}
        onPressListItem={handlePressListItem}
      />
    </ScrollView>
  );
}
