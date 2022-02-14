import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Context } from "../../context";
import axios from "axios";
import { PersonInfoHeader, AddModal, Table } from "../../components/index";
import Screen from "../style";

const MasterScreen = ({ route, navigation }) => {
  const { appointments, visibleMastersReductModal } = React.useContext(Context);
  const { master } = route.params;
  const [current, setCurrent] = React.useState(master);
  const [statistic, setStatistic] = React.useState({});

  const getMasterStatistic = () => {
    axios
      .get(`/statistic/masters/${master.id}`)
      .then(({ data }) => setStatistic(data))
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    getMasterStatistic();
  }, []);

  console.log(statistic);

  return (
    <ScrollView
      style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={current} master={true} />

      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={2}
          title={`Сегодня, ${statistic.date}: `}
          firstLabel={() => "время"}
          secondLabel={() => "прибыль"}
          firstValue={() => (
            <Text style={{ color: "#757575" }}>{statistic.dayHours} ч.</Text>
          )}
          secondValue={() => (
            <Text style={{ color: "#757575" }}>{statistic.dayIncome} руб.</Text>
          )}
        />
      </View>
      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={2}
          title="Месяц:"
          firstLabel={() => "время"}
          secondLabel={() => "прибыль"}
          firstValue={() => (
            <Text style={{ color: "#757575" }}>{statistic.monthHours} ч.</Text>
          )}
          secondValue={() => (
            <Text style={{ color: "#757575" }}>
              {statistic.monthIncome} руб.
            </Text>
          )}
        />
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

export default MasterScreen;
