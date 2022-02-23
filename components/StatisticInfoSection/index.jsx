import { View, Text } from "react-native";
import React from "react";
import Table from "../shared/Table";
import style from "./style";
import Screen from "../../screens/style";

const StatisticInfoSection = ({ stat, type }) => {
  const infoSectionTableData = {
    title: "Прибыль:",
    data: [
      {
        label: <Text>доп. услуги</Text>,
        value: <Text>{stat.addonIncome} руб.</Text>,
      },
      {
        label: <Text>иглы</Text>,
        value: <Text>{stat.needleIncome} руб.</Text>,
      },
      {
        label: <Text>приемы</Text>,
        value: <Text>{stat.overallIncome} руб.</Text>,
      },
      {
        label: <Text>общая</Text>,
        value: <Text>{stat.priceIncome} руб.</Text>,
      },
    ],
  };
  const infoSectionTableIsolatedNeedlesData = {
    title: "Изол. иглы:",
    data: [
      {
        label: <Text>№1</Text>,
        value: <Text>{stat.needles.isolated.first} шт.</Text>,
      },
      {
        label: <Text>№2</Text>,
        value: <Text>{stat.needles.isolated.second} шт.</Text>,
      },
      {
        label: <Text>№3</Text>,
        value: <Text>{stat.needles.isolated.third} шт.</Text>,
      },
      {
        label: <Text>№4</Text>,
        value: <Text>{stat.needles.isolated.fourth} шт.</Text>,
      },
    ],
  };
  const infoSectionTableNoneIsolatedNeedlesData = {
    title: "Обыч. иглы:",
    data: [
      {
        label: <Text>№1</Text>,
        value: <Text>{stat.needles.nonIsolated.first} шт.</Text>,
      },
      {
        label: <Text>№2</Text>,
        value: <Text>{stat.needles.nonIsolated.second} шт.</Text>,
      },
      {
        label: <Text>№3</Text>,
        value: <Text>{stat.needles.nonIsolated.third} шт.</Text>,
      },
      {
        label: <Text>№4</Text>,
        value: <Text>{stat.needles.nonIsolated.fourth} шт.</Text>,
      },
    ],
  };
  const infoSectionTableAdditionalData = {
    title: "Кол-во доп. услуг:",
    data: [
      {
        label: <Text>инъекционная анестезия</Text>,
        value: <Text>{stat.addons.injection}</Text>,
      },
      {
        label: <Text>аппликационная анестезия</Text>,
        value: <Text>{stat.addons.ointment}</Text>,
      },
      {
        label: <Text>окрашивание</Text>,
        value: <Text>{stat.addons.coloring}</Text>,
      },
    ],
  };
  const statTitle = (type === "day" ? "Сегодня, " : "Месяц, ") + stat.date;

  return (
    <View style={style.wrapper}>
      <Text style={style.title}>{statTitle}</Text>
      <View style={[Screen.infoCardWrapper, style.tableWrapper]}>
        <Table backgroundColor="#f1f3f4" tableValues={infoSectionTableData} />
      </View>

      <View style={style.rowDerection}>
        <View
          style={[
            Screen.infoCardWrapper,
            style.tableWrapper,
            style.needlesTableLeft,
          ]}
        >
          <Table
            backgroundColor="#f1f3f4"
            tableValues={infoSectionTableNoneIsolatedNeedlesData}
          />
        </View>

        <View
          style={[
            Screen.infoCardWrapper,
            style.tableWrapper,
            style.needlesTableRight,
          ]}
        >
          <Table
            backgroundColor="#f1f3f4"
            tableValues={infoSectionTableIsolatedNeedlesData}
          />
        </View>
      </View>

      <View style={[Screen.infoCardWrapper, style.tableWrapper]}>
        <Table
          backgroundColor="#f1f3f4"
          tableValues={infoSectionTableAdditionalData}
        />
      </View>
    </View>
  );
};

export default StatisticInfoSection;
