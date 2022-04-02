import React from "react";
import { View, Text } from "react-native";
import Table from "../../shared/Table";
import Label from "../../shared/Label";
import Card from "./style";

const AppointmentCard = ({ item }) => {
  console.log("AppointmentCard");

  const dateTableInfo = {
    title: "Дата:",
    data: [
      {
        label: <Label>число</Label>,
        value: <Text>{item.start.split(" ")[0]}</Text>,
      },
    ],
  };

  const timeTableInfo = {
    title: "Время:",
    data: [
      {
        label: <Label>начало</Label>,
        value: <Text>{item.start.split(" ")[1]}</Text>,
      },
      {
        label: <Label>конец</Label>,
        value: <Text>{item.finish.split(" ")[1]}</Text>,
      },
    ],
  };

  const areaTableInfo = {
    title: "Зона:",
    data: [
      {
        label: <Label>зона</Label>,
        value: <Text>{item.area ? item.area : "Брови"}</Text>,
      },
    ],
  };

  return (
    <>
      <View style={Card.Wrapper}>
        <Table tableValues={dateTableInfo} />
      </View>

      <View style={Card.Wrapper}>
        <Table tableValues={timeTableInfo} />
      </View>

      <View style={Card.Wrapper}>
        <Table tableValues={areaTableInfo} />
      </View>
    </>
  );
};

export default AppointmentCard;
