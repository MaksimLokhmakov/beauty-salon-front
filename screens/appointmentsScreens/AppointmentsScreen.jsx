import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { Context } from "../../context";

import { PersonConteiner } from "../../components";
import Screen from "../style";

const AppointmentsScreen = () => {
  const { appointments } = React.useContext(Context);
  const lastAppointmentDate =
    appointments[appointments.length - 1].data[
      appointments[appointments.length - 1].data.length - 1
    ].date;
  return (
    <View style={Screen.wrapper}>
      <SectionList
        sections={appointments}
        keyExtractor={(item) => item.fullName}
        // onRefresh={() => {}}
        // refreshing={true}
        renderItem={({ item }) => {
          return (
            <PersonConteiner
              item={item}
              onPress={() => {}}
              lastElemMarging={lastAppointmentDate === item.date && 95}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={Screen.sectionTitle}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AppointmentsScreen;
