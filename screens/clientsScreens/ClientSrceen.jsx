import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { PersonInfoHeader, AppointmentCard } from "../../components";
import Screen from "../style";

const ClientSrceen = ({ route }) => {
  const { client } = route.params;

  const [appointments, setAppointments] = React.useState([
    {
      fullName: "Александр Ерошин",
      phoneNumber: "+375(25)655-84-24",
      date: "24.12.2021 - 12:30",
      duration: "3",
      area: "Бикини",
    },
    {
      fullName: "Елена Метельская",
      phoneNumber: "+375(25)125-22-24",
      date: "24.12.2019 - 15:30",
      duration: "2",
      area: "Бикини",
    },
    {
      fullName: "Екатерина Лохмакова",
      phoneNumber: "+375(25)229-23-21",
      date: "24.12.2019 - 17:30",
      duration: "1",
      area: "Бикини",
    },
  ]);

  return (
    <View style={Screen.appointmentsWrapper}>
      <PersonInfoHeader item={client} mainButtonText="Проведено процедур: 3" />

      <View style={Screen.apoointmentsConteiner}>
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.fullName}
          // onRefresh={}
          // refreshing={}
          renderItem={({ item, index }) => {
            return (
              <AppointmentCard
                client={item}
                last={index === appointments.length - 1 && 170}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ClientSrceen;
