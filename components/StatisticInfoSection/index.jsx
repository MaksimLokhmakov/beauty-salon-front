import { View, Text } from "react-native";
import React from "react";

import Table from "../Table";
import style from "./style";
import Screen from "../../screens/style";

export default function StatisticInfoSection({ stat, type }) {
  return (
    <View style={style.wrapper}>
      <Text style={{ fontSize: 19, marginBottom: 10, marginLeft: 10 }}>
        {type === "day" && `Сегодня,`} {stat.date}
      </Text>
      <View style={{ ...Screen.infoCardWrapper, backgroundColor: "#f1f3f4" }}>
        <Table
          title="Прибыль:"
          backgroundColor="#f1f3f4"
          numberOfRows={4}
          firstLabel={() => <Text>доп. услуги</Text>}
          secondLabel={() => <Text>иглы</Text>}
          thirdLabel={() => <Text>приемы</Text>}
          fourthLabel={() => <Text>общая</Text>}
          firstValue={() => <Text>{stat.addonIncome} руб.</Text>}
          secondValue={() => <Text>{stat.needleIncome} руб.</Text>}
          thirdValue={() => <Text>{stat.overallIncome} руб.</Text>}
          fourthValue={() => <Text>{stat.priceIncome} руб.</Text>}
        />
      </View>

      {/* Иглы */}
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            ...Screen.infoCardWrapper,
            backgroundColor: "#f1f3f4",
            marginRight: 5,
          }}
        >
          <Table
            two
            title="Обыч. иглы:"
            backgroundColor="#f1f3f4"
            numberOfRows={4}
            firstLabel={() => <Text>№1</Text>}
            secondLabel={() => <Text>№2</Text>}
            thirdLabel={() => <Text>№3</Text>}
            fourthLabel={() => <Text>№4</Text>}
            firstValue={() => <Text>{stat.needles.nonIsolated.first} шт.</Text>}
            secondValue={() => (
              <Text>{stat.needles.nonIsolated.second} шт.</Text>
            )}
            thirdValue={() => <Text>{stat.needles.nonIsolated.third} шт.</Text>}
            fourthValue={() => (
              <Text>{stat.needles.nonIsolated.fourth} шт.</Text>
            )}
          />
        </View>
        <View
          style={{
            ...Screen.infoCardWrapper,
            backgroundColor: "#f1f3f4",
            marginLeft: 5,
          }}
        >
          <Table
            two
            title="Изол. иглы:"
            backgroundColor="#f1f3f4"
            numberOfRows={4}
            firstLabel={() => <Text>№1</Text>}
            secondLabel={() => <Text>№2</Text>}
            thirdLabel={() => <Text>№3</Text>}
            fourthLabel={() => <Text>№4</Text>}
            firstValue={() => <Text>{stat.needles.isolated.first} шт.</Text>}
            secondValue={() => <Text>{stat.needles.isolated.second} шт.</Text>}
            thirdValue={() => <Text>{stat.needles.isolated.third} шт.</Text>}
            fourthValue={() => <Text>{stat.needles.isolated.fourth} шт.</Text>}
          />
        </View>
      </View>
      <View style={{ ...Screen.infoCardWrapper, backgroundColor: "#f1f3f4" }}>
        <Table
          two
          numberOfRows={3}
          backgroundColor="#f1f3f4"
          title="Кол-во доп. услуг"
          firstLabel={() => <Text>инъекционная анестезия</Text>}
          secondLabel={() => <Text>аппликационная анестезия</Text>}
          thirdLabel={() => <Text>окрашивание</Text>}
          firstValue={() => <Text>{stat.addons.injection}</Text>}
          secondValue={() => <Text>{stat.addons.ointment}</Text>}
          thirdValue={() => <Text>{stat.addons.coloring}</Text>}
        />
      </View>
    </View>
  );
}
