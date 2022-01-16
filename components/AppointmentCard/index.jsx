import React from "react";
import { View, Text } from "react-native";

import Table from "../Table";

import Card from "./style";

const AppointmentCard = ({ item }) => {
  return (
    <>
      <View style={Card.Wrapper}>
        <Table
          one
          title="Дата:"
          firstLabel="число    "
          firstValue={() => <Text>{item.start.split(" ")[0]}</Text>}
        />
      </View>
      <View style={Card.Wrapper}>
        <Table
          title="Время:"
          firstLabel="начало"
          firstValue={() => <Text>{item.start.split(" ")[1]}</Text>}
          secondLabel="конец"
          secondValue={() => <Text>{item.finish.split(" ")[1]}</Text>}
        />
      </View>
      <View style={Card.Wrapper}>
        <Table
          one
          title="Зона:"
          firstLabel="зона"
          firstValue={() => <Text>{item.area ? item.area : "Брови"}</Text>}
        />
      </View>
      <View style={Card.Wrapper}>
        <Table
          one
          title="Цена:"
          firstLabel="цена"
          firstValue={() => <Text>{"-"}</Text>}
        />
      </View>
    </>
  );
};

export default AppointmentCard;
