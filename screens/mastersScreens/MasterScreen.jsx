import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Context } from "../../context";
import axios from "axios";
import {
  PersonInfoHeader,
  AddModal,
  Table,
  Label,
} from "../../components/index";
import Screen from "../style";

const MasterScreen = ({ route }) => {
  const { visibleMastersReductModal } = React.useContext(Context);
  const { master } = route.params;
  const [current, setCurrent] = React.useState(master);
  const [statistic, setStatistic] = React.useState({});
  React.useEffect(() => {
    getMasterStatistic();
  }, []);

  const getMasterStatistic = () => {
    axios
      .get(`/statistic/masters/${master.id}`)
      .then(({ data }) => setStatistic(data))
      .catch((e) => console.log(e));
  };

  const tableDayStatData = {
    title: `Сегодня, ${statistic.date}:`,
    data: [
      {
        label: <Label>время</Label>,
        value: <Text style={localStyle.textGray}>{statistic.dayHours} ч.</Text>,
      },
      {
        label: <Label>прибыль</Label>,
        value: (
          <Text style={localStyle.textGray}>{statistic.dayIncome} руб.</Text>
        ),
      },
    ],
  };

  const tableMonthStatData = {
    title: "Месяц:",
    data: [
      {
        label: <Label>время</Label>,
        value: (
          <Text style={localStyle.textGray}>{statistic.monthHours} ч.</Text>
        ),
      },
      {
        label: <Label>прибыль</Label>,
        value: (
          <Text style={localStyle.textGray}>{statistic.monthIncome} руб.</Text>
        ),
      },
    ],
  };
  console.log("MasterScreen", statistic);

  return (
    <ScrollView
      style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={current} master={true} />
      <View style={Screen.infoCardWrapper}>
        <Table tableValues={tableDayStatData} />
      </View>

      <View style={Screen.infoCardWrapper}>
        <Table tableValues={tableMonthStatData} />
      </View>
      {/* //! добавить отображение ближайшего приема мастера */}

      <AddModal
        adit
        master
        visible={visibleMastersReductModal}
        item={current}
        setChanges={setCurrent}
      />
    </ScrollView>
  );
};

const localStyle = StyleSheet.create({
  textGray: {
    color: "#757575",
  },
});

export default MasterScreen;
