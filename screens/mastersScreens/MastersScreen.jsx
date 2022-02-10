import React from "react";
import { View, FlatList } from "react-native";
import { Context } from "../../context";
import axios from "axios";
import recenter from "../../utils/forSwipeable/recenter";

import { PersonConteiner, AddModal } from "../../components/index";
import Screen from "../style";

const MastersScreen = ({ navigation }) => {
  const {
    masters,
    getMasters,
    visibleMastersModal,
    setMasters,
    setVisibleMastersModel,
    setItemToDelete,
  } = React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSwiping, setIsSwiping] = React.useState(false);
  const [currentSwipeRef, setCurrentSwipeRef] = React.useState(null);

  const handleScroll = () => {
    if (currentSwipeRef) recenter(currentSwipeRef);
  };
  const onOpen = (newRef) => {
    if (currentSwipeRef && currentSwipeRef !== newRef)
      recenter(currentSwipeRef);

    setCurrentSwipeRef(newRef);
  };
  const onClose = () => setCurrentSwipeRef(null);

  const refresh = () => {
    setIsLoading(true);
    getMasters();
    setIsLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  const toMasterInfo = (master) => {
    navigation.navigate("MasterScreen", { master });
  };

  const deleteMaster = (currentItem) => {
    setMasters((prev) => prev.filter((item) => item.id !== currentItem.id));
    axios
      .delete(`/masters/${currentItem.id}`)
      .then(() => console.log("OK"))
      .catch((e) => console.log(e));
  };

  const openDeleteModal = (currentItem) => {
    setItemToDelete(currentItem), setVisibleMastersModel(true);
  };

  return (
    <View style={Screen.wrapper}>
      <FlatList
        onScrollBeginDrag={handleScroll}
        scrollEnabled={!isSwiping}
        data={masters}
        keyExtractor={(item) => item.id}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <PersonConteiner
            item={item}
            onPress={toMasterInfo}
            openDeleteModal={openDeleteModal}
            onDelete={deleteMaster}
            setIsSwiping={setIsSwiping}
            onOpen={onOpen}
            onClose={onClose}
            currentSwipeRef={currentSwipeRef}
          />
        )}
      />

      <AddModal
        master={true}
        visible={visibleMastersModal}
        onDelete={deleteMaster}
      />
    </View>
  );
};

export default MastersScreen;
