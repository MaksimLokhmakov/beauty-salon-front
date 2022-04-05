import React from "react";
import { View, Platform, FlatList } from "react-native";
import { Context } from "../../context";
import recenter from "../../utils/forSwipeable/recenter";
import {
  PersonConteiner,
  AddModal,
  PureListAnimation,
} from "../../components/index";
import axios from "axios";
import Screen from "../style";
import not_found from "../../assets/lottie/not_found.json";

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
  const currentRef = React.useRef();
  currentRef.current = currentSwipeRef;
  React.useEffect(() => {
    refresh();
  }, []);

  const ITEM_HEIGHT = 56.5;

  console.log("MastersScreen");
  // ! UNACTIVE
  const setSwiping = (value) => setIsSwiping(value);
  const refresh = () => {
    setIsLoading(true);
    getMasters();
    setIsLoading(false);
  };
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
    setItemToDelete(currentItem);
    setVisibleMastersModel(true);
  };
  // * SWIPEABLE
  const handleScroll = () => {
    if (currentSwipeRef) recenter(currentSwipeRef);
  };
  const onOpen = (newRef) => {
    if (currentRef.current && currentRef.current !== newRef)
      recenter(currentRef.current);

    setCurrentSwipeRef(newRef);
  };
  const onClose = () => setCurrentSwipeRef(null);
  // * FLATLIST
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });
  const flatListItem = ({ item, index }) => (
    <PersonConteiner
      item={item}
      index={index}
      onPress={toMasterInfo}
      onDelete={deleteMaster}
      setIsSwiping={setSwiping}
      onOpen={onOpen}
      onClose={onClose}
    />
  );
  const flatListItemId = (item) => item.id;

  return (
    <View
      style={[
        Screen.wrapper,
        Platform.OS === "android" && Screen.androidPaddingTop,
      ]}
    >
      {masters.length > 0 ? (
        <FlatList
          getItemLayout={getItemLayout}
          initialNumToRender={15}
          onScrollBeginDrag={handleScroll}
          scrollEnabled={!isSwiping}
          data={masters}
          keyExtractor={flatListItemId}
          onRefresh={refresh}
          refreshing={isLoading}
          renderItem={flatListItem}
        />
      ) : (
        <PureListAnimation
          animation={not_found}
          titleText={"Нет результатов."}
          secondaryText={`По запросу «${searchValue}» ничего не найдено.`}
        />
      )}

      <AddModal
        master={true}
        visible={visibleMastersModal}
        onDelete={deleteMaster}
      />
    </View>
  );
};

export default React.memo(MastersScreen);
