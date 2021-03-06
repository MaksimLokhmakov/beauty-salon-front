import React from "react";
import { View, SectionList, Text, Platform } from "react-native";
import { Context } from "../../context";
import recenter from "../../utils/forSwipeable/recenter";
import axios from "axios";
import {
  PersonConteiner,
  SearchBar,
  ModalList,
  PureListAnimation,
} from "../../components";
import Screen from "../style";
import not_found from "../../assets/lottie/not_found.json";
import empty from "../../assets/lottie/6863-tenor.json";

const AppointmentsScreen = ({ navigation }) => {
  const {
    masters,
    appointments,
    setAppointments,
    getAppointments,
    setSortVisibleAppointmentsList,
    sortVisibleAppointmentsList,
  } = React.useContext(Context);
  const [isSwiping, setIsSwiping] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [sortValue, setSortValue] = React.useState("Все");
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSwipeRef, setCurrentSwipeRef] = React.useState(null);
  const currentRef = React.useRef();
  currentRef.current = currentSwipeRef;
  React.useEffect(() => {
    refresh();
  }, []);

  console.log("AppointmentsScreen");

  // ! ПЕРЕДЕЛАТЬ ПОИСК
  // ! UNACTIVE
  const setSwiping = (value) => setIsSwiping(value);

  const onSortSelection = React.useCallback((value) => {
    setSortValue(value);
    setSortVisibleAppointmentsList(false);
  }, []);
  const toAppointmentInfo = (appointment) => {
    navigation.navigate("AppointmentScreen", { appointment });
  };
  const refresh = () => {
    setIsLoading(true);
    getAppointments();
    setIsLoading(false);
  };
  // * SORT || SEARCH
  const onSort = (section, currentValue) => {
    const value = currentValue;
    if (sortValue === "Все") return section;
    if (section.data.find((item) => item.master.name === value)) {
      return {
        title: section.title,
        data: section.data.filter((item) => item.master.name === value),
      };
    }
    return false;
  };
  const onSearch = (section, currentValue) => {
    const value = currentValue.toLowerCase();
    if (section.title.toLowerCase().includes(value)) return section;
    if (
      section.data.find((item) =>
        item.client.name.toLowerCase().includes(value)
      )
    ) {
      return {
        title: section.title,
        data: section.data.filter((item) =>
          item.client.name.toLowerCase().includes(value)
        ),
      };
    }
    return false;
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
  const onDelete = ({ id }) => {
    setAppointments((prev) =>
      prev.filter((group) => {
        group.data = group.data.filter((item) => item.id !== id);
        if (group.data.length !== 0) {
          return group;
        }
      })
    );
    axios
      .delete(`orders/${id}`)
      .then(() => console.log("YES"))
      .catch((e) => console.log(e));
  };
  const onClose = () => setCurrentSwipeRef(null);
  // * SECTIONLIST
  const sectionHeader = ({ section: { title } }) => {
    const unfinishedTitle = title === "Незавершенные";
    const inProcess = title === "В процессе";
    const color = unfinishedTitle ? "#fe3c30" : inProcess ? "#007aff" : "#212";

    return (
      <Text style={{ ...Screen.sectionTitle, color: color }}>{title}</Text>
    );
  };
  const sectionListItem = ({ item, index }) => {
    return (
      <PersonConteiner
        item={item}
        index={index}
        onPress={toAppointmentInfo}
        setIsSwiping={setSwiping}
        onOpen={onOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    );
  };
  const sectionListItemKey = (item) => item.id;
  const sortedSections = appointments
    .filter((item) => onSort(item, sortValue))
    .map((item) => {
      if (onSort(item, sortValue)) return onSort(item, sortValue);
      return item;
    });
  const searchInSections = sortedSections
    .map((item) => {
      if (onSearch(item, searchValue)) return onSearch(item, searchValue);
      return item;
    })
    .filter((item) => onSearch(item, searchValue));
  const sections = searchInSections;
  // * MODALLIST
  const listData = [{ name: "Все" }, ...masters];

  return (
    <View
      style={[
        Screen.wrapper,
        Platform.OS === "android" && Screen.androidPaddingTop,
      ]}
    >
      <SearchBar value={searchValue} setValue={setSearchValue} />

      {sections.length === 0 ? (
        <PureListAnimation
          animation={searchValue.length !== 0 ? not_found : empty}
          titleText={
            searchValue.length !== 0 ? "Нет результатов." : "Записей нет!"
          }
          animationStyle={{ width: 350, height: 350 }}
          titleStyle={{ fontSize: 20 }}
          secondaryTextStyle={{ fontSize: 18 }}
          secondaryText={
            searchValue.length !== 0
              ? `По запросу «${searchValue}» ничего не найдено.`
              : "Кажется, можно отдохнуть..."
          }
        />
      ) : (
        <SectionList
          initialNumToRender={15}
          onScrollBeginDrag={handleScroll}
          scrollEnabled={!isSwiping}
          sections={sections}
          keyExtractor={sectionListItemKey}
          onRefresh={refresh}
          refreshing={isLoading}
          renderItem={sectionListItem}
          renderSectionHeader={sectionHeader}
          stickySectionHeadersEnabled={true}
        />
      )}

      <ModalList
        sortValue={sortValue}
        list={listData}
        visible={sortVisibleAppointmentsList}
        onPressListItem={onSortSelection}
      />
    </View>
  );
};

export default AppointmentsScreen;
