import { View, Text } from "react-native";
import React from "react";
import Table from "../../shared/Table";
import style from "./style";
import Label from "../.././shared/Label";
import Screen from "../../../screens/style";

const StatisticInfoSection = ({ stat, type }) => {
  const infoSectionTableData = {
    title: "Прибыль:",
    data: [
      {
        label: <Label>доп. услуги</Label>,
        value: <Text>{stat.addonIncome} руб.</Text>,
      },
      {
        label: <Label>иглы</Label>,
        value: <Text>{stat.needleIncome} руб.</Text>,
      },
      {
        label: <Label>приемы</Label>,
        value: <Text>{stat.overallIncome} руб.</Text>,
      },
      {
        label: <Label>общая</Label>,
        value: <Text>{stat.priceIncome} руб.</Text>,
      },
    ],
  };
  const infoSectionTableIsolatedNeedlesData = {
    title: "Изол. иглы:",
    data: [
      {
        label: <Label width={25}>№1</Label>,
        value: <Text>{stat.needles.isolated.first} шт.</Text>,
      },
      {
        label: <Label width={25}>№2</Label>,
        value: <Text>{stat.needles.isolated.second} шт.</Text>,
      },
      {
        label: <Label width={25}>№3</Label>,
        value: <Text>{stat.needles.isolated.third} шт.</Text>,
      },
      {
        label: <Label width={25}>№4</Label>,
        value: <Text>{stat.needles.isolated.fourth} шт.</Text>,
      },
    ],
  };
  const infoSectionTableNoneIsolatedNeedlesData = {
    title: "Обыч. иглы:",
    data: [
      {
        label: <Label width={25}>№1</Label>,
        value: <Text>{stat.needles.nonIsolated.first} шт.</Text>,
      },
      {
        label: <Label width={25}>№2</Label>,
        value: <Text>{stat.needles.nonIsolated.second} шт.</Text>,
      },
      {
        label: <Label width={25}>№3</Label>,
        value: <Text>{stat.needles.nonIsolated.third} шт.</Text>,
      },
      {
        label: <Label width={25}>№4</Label>,
        value: <Text>{stat.needles.nonIsolated.fourth} шт.</Text>,
      },
    ],
  };
  const infoSectionTableAdditionalData = {
    title: "Кол-во доп. услуг:",
    data: [
      {
        label: <Label>инъекционная анестезия</Label>,
        value: <Text>{stat.addons.injection}</Text>,
      },
      {
        label: <Label>аппликационная анестезия</Label>,
        value: <Text>{stat.addons.ointment}</Text>,
      },
      {
        label: <Label>окрашивание</Label>,
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

export default React.memo(StatisticInfoSection);
