import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Table from "../.././shared/Table";
import Label from "../.././shared/Label";
import Screen from "../../../screens/style";

const MasterBlock = ({ index, item }) => {
  const mastersDayInfoTableData = {
    title: "Сегодня: ",
    data: [
      {
        label: <Label>время</Label>,
        value: <Text>{item.dayHours} ч.</Text>,
      },
      {
        label: <Label>прибыль</Label>,
        value: <Text>{item.dayIncome} руб.</Text>,
      },
    ],
  };

  const mastersMonthInfoTableData = {
    title: "Месяц:",
    data: [
      {
        label: <Label>время</Label>,
        value: <Text>{item.monthHours} ч.</Text>,
      },
      {
        label: <Label>прибыль</Label>,
        value: <Text>{item.monthIncome} руб.</Text>,
      },
    ],
  };

  return (
    <Animated.View
      entering={FadeIn.delay(50 * index)}
      exiting={FadeOut}
      style={{
        ...Screen.infoCardWrapper,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 10, marginLeft: 10 }}>
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
};

export default React.memo(MasterBlock);
