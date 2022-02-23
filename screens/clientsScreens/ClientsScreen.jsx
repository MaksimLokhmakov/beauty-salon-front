import React from "react";
import { View, Platform } from "react-native";
import { Context } from "../../context";
import Animated, { Layout } from "react-native-reanimated";
import axios from "axios";
import recenter from "../../utils/forSwipeable/recenter";
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
  const [currentSwipeRef, setCurrentSwipeRef] = React.useState(null);
  const currentRef = React.useRef();
  currentRef.current = currentSwipeRef;
  React.useEffect(() => {
    refresh();
  }, []);

  console.log("ClientsScreen");

  const ITEM_HEIGHT = 56.5;

  const refresh = () => {
    setIsLoading(true);
    getClients();
    setIsLoading(false);
  };
  const toClientInfo = (client) => {
    navigation.navigate("ClientSrceen", { client });
  };
  const deleteClient = React.useCallback((currentItem) => {
    setClients((prev) => prev.filter((item) => item.id !== currentItem.id));
    axios
      .delete(`/clients/${currentItem.id}`)
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  }, []);
  // ! UNACTIVE
  const openDeleteModal = (currentItem) => {
    setItemToDelete(currentItem), setVisibleClientsModel(true);
  };
  const setSwiping = (value) => setIsSwiping(value);
  // * SWIPEABLE
  const handleScroll = () => {
    if (currentSwipeRef) recenter(currentSwipeRef);
  };
  const onOpen = React.useCallback((newRef) => {
    if (currentRef.current && currentRef.current !== newRef)
      recenter(currentRef.current);

    setCurrentSwipeRef(newRef);
  }, []);
  const onClose = () => recenter(currentSwipeRef);
  // * FLATLIST
  const flatListItem = ({ item, index }) => (
    <PersonConteiner
      item={item}
      key={flatListItemKey}
      index={index}
      onPress={toClientInfo}
      setIsSwiping={setSwiping}
      onClose={onClose}
      onOpen={onOpen}
      onDelete={deleteClient}
    />
  );
  const flatListItemKey = (item) => item.id;
  const getItemLayout = (item, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };
  const flatListDataWithSearch = clients.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <View
      style={[
        Screen.wrapper,
        Platform.OS === "android" && Screen.androidPaddingTop,
      ]}
    >
      <SearchBar value={searchValue} setValue={setSearchValue} />

      <Animated.FlatList
        getItemLayout={getItemLayout}
        initialNumToRender={15}
        itemLayoutAnimation={Layout}
        onScrollBeginDrag={handleScroll}
        scrollEnabled={!isSwiping}
        style={{ paddingTop: 10 }}
        data={flatListDataWithSearch}
        keyExtractor={flatListItemKey}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={flatListItem}
      />

      <AddModal visible={visibleClientsModal} onDelete={deleteClient} />
    </View>
  );
};

export default ClientsScreen;
