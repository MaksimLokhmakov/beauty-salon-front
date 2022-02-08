import React from "react";
import { View, FlatList } from "react-native";
import { Context } from "../../context";
import axios from "axios";

import { PersonConteiner, AddModal, SearchBar } from "../../components";
import Screen from "../style";

const ClientsScreen = ({ navigation }) => {
  const {
    clients,
    visibleClientsModal,
    getClients,
    setClients,
    setItemToDelete,
    setVisibleClientsModel,
  } = React.useContext(Context);
  const [isSwiping, setIsSwiping] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");

  const refresh = () => {
    setIsLoading(true);
    getClients();
    setIsLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  const toClientInfo = (client) => {
    navigation.navigate("ClientSrceen", { client });
  };

  const deleteClient = (currentItem) => {
    setClients((prev) => prev.filter((item) => item.id !== currentItem.id));
    axios
      .delete(`/clients/${currentItem.id}`)
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  };

  const openDeleteModal = (currentItem) => {
    setItemToDelete(currentItem), setVisibleClientsModel(true);
  };

  return (
    <View style={Screen.wrapper}>
      <SearchBar value={searchValue} setValue={setSearchValue} />
      <FlatList
        scrollEnabled={!isSwiping}
        style={{ paddingTop: 10 }}
        data={clients.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <PersonConteiner
            item={item}
            onPress={toClientInfo}
            onDelete={deleteClient}
            openDeleteModal={openDeleteModal}
            setIsSwiping={setIsSwiping}
          />
        )}
      />
      <AddModal visible={visibleClientsModal} onDelete={deleteClient} />
    </View>
  );
};

export default ClientsScreen;
