import React from "react";
import { View, SectionList, Text } from "react-native";
import { Context } from "../../context";
import recenter from "../../utils/forSwipeable/recenter";

import {
  PersonConteiner,
  SearchBar,
  AddAppointmentModel,
  ModalList,
} from "../../components";
import Screen from "../style";

const AppointmentsScreen = ({ navigation }) => {
  const {
    masters,
    appointments,
    getAppointments,
    setSortVisibleAppointmentsList,
    sortVisibleAppointmentsList,
  } = React.useContext(Context);

  const [isSwiping, setIsSwiping] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [sortValue, setSortValue] = React.useState("Все");
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSwipeRef, setCurrentSwipeRef] = React.useState(null);

  const refresh = () => {
    setIsLoading(true);
    getAppointments();
    setIsLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  // ! ПЕРЕДЕЛАТЬ ПОИСК

  const onPressListItem = (value) => {
    setSortValue(value);
    setSortVisibleAppointmentsList(false);
  };

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

  const toAppointmentInfo = (appointment) => {
    navigation.navigate("AppointmentScreen", { appointment });
  };

  const handleScroll = () => {
    if (currentSwipeRef) recenter(currentSwipeRef);
  };
  const onOpen = (newRef) => {
    if (currentSwipeRef && currentSwipeRef !== newRef)
      recenter(currentSwipeRef);

    setCurrentSwipeRef(newRef);
  };
  const onClose = () => setCurrentSwipeRef(null);

  return (
    <View style={Screen.wrapper}>
      <SearchBar value={searchValue} setValue={setSearchValue} />

      <SectionList
        onScrollBeginDrag={handleScroll}
        scrollEnabled={!isSwiping}
        sections={appointments
          .filter((item) => onSort(item, sortValue))
          .map((item) => {
            if (onSort(item, sortValue)) return onSort(item, sortValue);
            return item;
          })
          .map((item) => {
            if (onSearch(item, searchValue)) return onSearch(item, searchValue);
            return item;
          })
          .filter((item) => onSearch(item, searchValue))}
        keyExtractor={(item) => item.id}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={({ item }) => {
          return (
            <PersonConteiner
              item={item}
              onPress={toAppointmentInfo}
              setIsSwiping={setIsSwiping}
              onOpen={onOpen}
              onClose={onClose}
              currentSwipeRef={currentSwipeRef}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={Screen.sectionTitle}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />

      <AddAppointmentModel />
      <ModalList
        sortValue={sortValue}
        list={[{ name: "Все" }, ...masters]}
        visible={sortVisibleAppointmentsList}
        onPressListItem={onPressListItem}
      />
    </View>
  );
};

export default AppointmentsScreen;
