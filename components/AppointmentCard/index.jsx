import React from "react";
import { View, Text } from "react-native";

import Table from "../Table";

import Card from "./style";

const AppointmentCard = ({ item }) => {
  return (
    <View style={Card.Wrapper}>
      <View style={{ top: 0, height: 55 }}>
        <Table
          title="Прием: "
          firstLabel="число    "
          firstValue={() => <Text>{item.start.split(" ")[0]}</Text>}
          secondLabel=""
          secondValue={() => <Text></Text>}
        />
      </View>
      <View style={{ height: 30 }}>
        <Table
          firstLabel="начало  "
          firstValue={() => <Text>{item.start.split(" ")[1]}</Text>}
          secondLabel=""
          secondValue={() => <Text></Text>}
        />
      </View>
      <View style={{ height: 30 }}>
        <Table
          firstLabel="конец    "
          firstValue={() => <Text>{item.finish.split(" ")[1]}</Text>}
          secondLabel=""
          secondValue={() => <Text></Text>}
        />
      </View>

      <Table
        firstLabel="зона"
        firstValue={() => <Text>{item.area ? item.area : "Брови"}</Text>}
        secondLabel="цена      "
        secondValue={() => <Text>{"-"}</Text>}
      />
    </View>
  );
};

export default AppointmentCard;
