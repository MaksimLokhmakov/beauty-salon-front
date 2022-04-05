import { View, Text, ScrollView } from "react-native";
import React from "react";
import OrderCompletionInfo from "../../../appointment/OrderCompletionInfo/OrderComplectionInfoWrapper";
import Table from "../../../shared/Table";
import PickClientBlock from "../PickClientModal";
import Screen from "../../../../screens/style";
import Style from "./style";

const Form = ({
  dateTimeTableData,
  masterClientTableData,
  areaTableData,
  handleClientPick,
  currentIdleTime,
  isEnteredDurationCorrect,
}) => {
  const idleTimeColor = isEnteredDurationCorrect ? "#0aba50" : "#999aa0";
  const idleTime = currentIdleTime.start + " - " + currentIdleTime.finish;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[Screen.infoCardWrapper, Style.dateTimeWrapper]}>
        <Table tableValues={dateTimeTableData} />
        <View style={Style.currentTimeBlock}>
          <Text style={{ color: idleTimeColor }}>{idleTime}</Text>
        </View>
      </View>

      <View style={[Screen.infoCardWrapper, Style.flexNull]}>
        <Table tableValues={areaTableData} />
      </View>

      <View style={[Screen.infoCardWrapper, Style.flexNull]}>
        <Table tableValues={masterClientTableData} isAnimated />
      </View>

      <PickClientBlock handleClientPick={handleClientPick} />
    </ScrollView>
  );
};

export default Form;
