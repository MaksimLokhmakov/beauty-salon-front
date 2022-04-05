import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import React from "react";
import Screen from "../../../../screens/style";
import { Context } from "../../../../context";
import SearchBar from "../../../shared/SearchBar";
import AddItemConteiner from "../../../shared/AddItemConteiner";
import Style from "./style";

const PickClientBlock = ({ handleClientPick }) => {
  const { clients } = React.useContext(Context);
  const [currentClients, setCurrentClients] = React.useState(clients);
  const [searchValue, setSearchValue] = React.useState("");
  const [isPicking, setIsPicking] = React.useState(false);

  const filterClients = (currentClient) => {
    const newClients = clients.filter((item) => item.id !== currentClient.id);
    setCurrentClients(newClients);
  };
  const pickClient = (currentClient) => {
    handleClientPick(currentClient);
    setIsPicking(false);
    filterClients(currentClient);
  };
  const clientsOnSearch = currentClients.filter((item) =>
    item.name.includes(searchValue)
  );
  const openModal = () => setIsPicking(true);
  const getKey = (item) => item.id;
  const getRenderItem = ({ item, index }) => {
    const lastElement = clientsOnSearch.length - 1 === index;

    return (
      <AddItemConteiner
        onPress={pickClient}
        item={item}
        lastElement={lastElement}
        animated={false}
      />
    );
  };

  return (
    <>
      <View style={[Screen.infoCardWrapper, Style.buttonWrapper]}>
        <TouchableOpacity onPress={openModal}>
          <Text style={Style.buttonText}>Выбрать клиента</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isPicking} transparent={true} animationType="slide">
        <View style={[Screen.infoCardWrapper, Style.modalWrapper]}>
          <SearchBar
            value={searchValue}
            setValue={setSearchValue}
            styleWrapper={Style.searchBarWrapper}
            styleInput={Style.searchBarInput}
          />

          <View style={[Screen.infoCardWrapper, Style.flatListWrapper]}>
            <FlatList
              data={clientsOnSearch}
              keyExtractor={getKey}
              renderItem={getRenderItem}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PickClientBlock;
