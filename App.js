import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import { Context } from "./context";
import Tabs from "./navigation/Tabs";

export default function App() {
  const [masters, setMasters] = React.useState([
    {
      fullName: "Алина Медведева",
      phoneNumber: "+375(25)655-84-24",
      persent: "5",
    },
    {
      fullName: "Ирина Крутько",
      phoneNumber: "+375(25)365-22-66",
      persent: "3",
    },
  ]);
  const [appointments, setAppointments] = React.useState([
    {
      title: "27 декабря",
      data: [
        {
          fullName: "Максим Поливода",
          phoneNumber: "+375(25)655-84-24",
          date: "27.12.2021 - 12:30",
          duration: "3",
        },
        {
          fullName: "Елена Метельская",
          phoneNumber: "+375(25)125-22-24",
          date: "27.12.2019 - 15:30",
          duration: "2",
        },
        {
          fullName: "Илья Кукушкин",
          phoneNumber: "+375(25)229-23-21",
          date: "27.12.2019 - 17:30",
          duration: "1",
        },
      ],
    },
    {
      title: "28 декабря",
      data: [
        {
          fullName: "Денис Никифоров",
          phoneNumber: "+375(25)655-84-24",
          date: "28.12.2021 - 12:30",
          duration: "3",
        },
        {
          fullName: "Юрий Котковец",
          phoneNumber: "+375(25)125-22-24",
          date: "28.12.2019 - 15:30",
          duration: "2",
        },
        {
          fullName: "Владимир Богданов",
          phoneNumber: "+375(25)229-23-21",
          date: "28.12.2019 - 17:30",
          duration: "1",
        },
      ],
    },
    {
      title: "29 декабря",
      data: [
        {
          fullName: "Денис Никифоров",
          phoneNumber: "+375(25)655-84-24",
          date: "29.12.2021 - 12:30",
          duration: "3",
        },
        {
          fullName: "Юрий Котковец",
          phoneNumber: "+375(25)125-22-24",
          date: "29.12.2019 - 15:30",
          duration: "2",
        },
        {
          fullName: "Владимир Богданов",
          phoneNumber: "+375(25)229-23-21",
          date: "29.12.2019 - 17:30",
          duration: "1",
        },
      ],
    },
  ]);
  const [clients, setClients] = React.useState([
    {
      fullName: "Максим Поливода",
      phoneNumber: "+375(25)655-84-24",
    },
    {
      fullName: "Елена Метельская",
      phoneNumber: "+375(25)125-22-24",
    },
    {
      fullName: "Илья Кукушкин",
      phoneNumber: "+375(25)229-23-21",
    },
    {
      fullName: "Денис Никифоров",
      phoneNumber: "+375(25)655-84-24",
    },
    {
      fullName: "Юрий Котковец",
      phoneNumber: "+375(25)125-22-24",
    },
    {
      fullName: "Владимир Богданов",
      phoneNumber: "+375(25)229-23-21",
    },
  ]);
  const getMasters = () => {
    axios
      .get("http://192.168.43.122:8080/masters")
      .then(({ data }) => console.log(data))
      .catch((e) => console.log("mistake --- " + e));
  };

  // * modal-add-screens functions
  const [visibleClientsModal, setVisibleClientsModel] = React.useState(false);
  const [visibleMastersModal, setVisibleMastersModel] = React.useState(false);
  const [visibleAppointmentsModal, setVisibleAppointmentsModel] =
    React.useState(false);

  return (
    <NavigationContainer>
      <Context.Provider
        value={{
          appointments,
          masters,
          clients,
          getMasters,
          visibleClientsModal,
          visibleMastersModal,
          visibleAppointmentsModal,
          setVisibleClientsModel,
          setVisibleMastersModel,
          setVisibleAppointmentsModel,
        }}
      >
        <Tabs />
      </Context.Provider>
    </NavigationContainer>
  );
}
