import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Context } from "../../context";

import { PersonInfoHeader, AddModal, Table } from "../../components/index";
import Screen from "../style";

const MasterScreen = ({ route, navigation }) => {
  const { appointments, visibleMastersReductModal } = React.useContext(Context);

  const { master } = route.params;
  const [current, setCurrent] = React.useState(master);

  return (
    <ScrollView
      style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={current} master={true} />

      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={2}
          title="День:"
          firstLabel={() => "время"}
          secondLabel={() => "прибыль"}
          firstValue={() => <Text style={{ color: "#757575" }}>7 ч.</Text>}
          secondValue={() => <Text style={{ color: "#757575" }}>110 руб.</Text>}
        />
      </View>
      <View style={Screen.infoCardWrapper}>
        <Table
          numberOfRows={2}
          title="Месяц:"
          firstLabel={() => "время"}
          secondLabel={() => "прибыль"}
          firstValue={() => <Text style={{ color: "#757575" }}>61 ч.</Text>}
          secondValue={() => (
            <Text style={{ color: "#757575" }}>1210 руб.</Text>
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
