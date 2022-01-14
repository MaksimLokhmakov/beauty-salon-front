import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";

axios.defaults.baseURL = "https://beauty-salon-serv.herokuapp.com";

import { Context } from "./context";
import Tabs from "./navigation/Tabs";

export default function App() {
  const [masters, setMasters] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [clients, setClients] = React.useState([]);

  const getMasters = () => {
    axios
      .get("/masters/sorted")
      .then(({ data }) => {
        setMasters(data);
      })
      .catch((e) => console.log("mistake --- " + e));
  };
  const getClients = () => {
    axios
      .get("/clients")
      .then(({ data }) => {
        setClients(data);
      })
      .catch((e) => console.log(e));
  };
  const getAppointments = () => {
    axios("/orders/sorted")
      .then(({ data }) => {
        setAppointments(data);
      })
      .catch((e) => console.log(e));
  };

  const [clientsSearchValue, setClientsSearchValue] = React.useState("");

  // * modal-add-screens functions
  const [visibleClientsModal, setVisibleClientsModel] = React.useState(false);
  const [visibleClientsReductModal, setVisibleClientsReductModal] =
    React.useState(false);

  const [visibleMastersModal, setVisibleMastersModel] = React.useState(false);
  const [visibleMastersReductModal, setVisibleMastersReductModal] =
    React.useState(false);

  const [visibleAppointmentsModal, setVisibleAppointmentsModel] =
    React.useState(false);
  const [visibleAppointmentsReductModal, setVisibleAppointmentsReductModal] =
    React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState();

  return (
    <NavigationContainer>
      <Context.Provider
        value={{
          itemToDelete,
          setItemToDelete,
          appointments,
          setAppointments,
          getAppointments,
          masters,
          setMasters,
          getMasters,
          clients,
          setClients,
          getClients,
          visibleClientsModal,
          setVisibleClientsModel,
          visibleClientsReductModal,
          setVisibleClientsReductModal,
          visibleMastersModal,
          setVisibleMastersModel,
          visibleMastersReductModal,
          setVisibleMastersReductModal,
          visibleAppointmentsModal,
          setVisibleAppointmentsModel,
          visibleAppointmentsReductModal,
          setVisibleAppointmentsReductModal,
          clientsSearchValue,
          setClientsSearchValue,
        }}
      >
        <Tabs />
      </Context.Provider>
    </NavigationContainer>
  );
}
