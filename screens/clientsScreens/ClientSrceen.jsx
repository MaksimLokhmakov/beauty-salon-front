import React from "react";
import { View, ScrollView } from "react-native";
import { Context } from "../../context";

import { PersonInfoHeader, AddModal } from "../../components";
import Screen from "../style";

const ClientSrceen = ({ route }) => {
  const { visibleClientsReductModal } = React.useContext(Context);

  const { client } = route.params;
  console.log(client);
  const [current, setCurrent] = React.useState(client);

  return (
    <ScrollView
      style={{ ...Screen.wrapper, backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={current} />

      <AddModal
        adit
        visible={visibleClientsReductModal}
        item={current}
        setChanges={setCurrent}
      />
    </ScrollView>
  );
};

export default ClientSrceen;
