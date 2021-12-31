import React from "react";
import { View, FlatList, Modal } from "react-native";
import { Context } from "../../context";

import { PersonConteiner, AddClientsModal } from "../../components";
import Screen from "../style";

const ClientsScreen = ({ navigation }) => {
  const { clients } = React.useContext(Context);

  const toClientInfo = (client) => {
    navigation.navigate("ClientSrceen", { client });
  };

  return (
    <View style={Screen.wrapper}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.fullName}
        // onRefresh={() => {}}
        // refreshing={true}
        renderItem={({ item }) => (
          <PersonConteiner item={item} onPress={toClientInfo} />
        )}
      />

      <AddClientsModal />
    </View>
  );
};

export default ClientsScreen;
