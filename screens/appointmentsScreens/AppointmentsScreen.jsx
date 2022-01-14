import React from "react";
import { View, SectionList, Text } from "react-native";
import { Context } from "../../context";

import { PersonConteiner, SearchBar } from "../../components";
import Screen from "../style";

const AppointmentsScreen = ({ navigation }) => {
  const { appointments, getAppointments } = React.useContext(Context);

  const [searchValue, setSearchValue] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(true);

  const refresh = () => {
    setIsLoading(true);
    getAppointments();
    setIsLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  // ! ПЕРЕДЕЛАТЬ ПОИСК

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

  return (
    <View style={Screen.wrapper}>
      <SearchBar value={searchValue} setValue={setSearchValue} />

      <SectionList
        sections={appointments
          .map((item) => {
            if (onSearch(item, searchValue)) return onSearch(item, searchValue);
            return item;
          })
          .filter((item) => onSearch(item, searchValue))}
        keyExtractor={(item) => item.id}
        onRefresh={refresh}
        refreshing={isLoading}
        renderItem={({ item }) => {
          return <PersonConteiner item={item} onPress={toAppointmentInfo} />;
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={Screen.sectionTitle}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
};

export default AppointmentsScreen;
