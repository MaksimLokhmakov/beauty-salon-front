import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { AppointmentCard, PersonInfoHeader } from "../../components/index";
import Screen from "../style";

const MasterScreen = ({ route }) => {
  const [clients, setClients] = React.useState([
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

  const { master } = route.params;
  return (
    <View style={Screen.appointmentsWrapper}>
      <PersonInfoHeader item={master} mainButtonText="Отчет мастера" />

      <View style={Screen.apoointmentsConteiner}>
        <FlatList
          data={clients}
          keyExtractor={(item) => item.fullName}
          // onRefresh={}
          // refreshing={}
          renderItem={({ item, index }) => {
            return (
              <AppointmentCard
                client={item}
                last={index === clients.length - 1 && 90}
                inMasterScreen={true}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MasterScreen;
