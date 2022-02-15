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
  const [dayStat, setDayStat] = React.useState({});
  const [monthStat, setMonthStat] = React.useState({});
  const [mastersStat, setMastersStat] = React.useState({});
  const [timeTable, setTimeTable] = React.useState([]);
  const [pickerStatVisible, setPickerStatVisible] = React.useState(false);
  const [sortVisibleAppointmentsList, setSortVisibleAppointmentsList] =
    React.useState(false);

  const getDayStatistic = () =>
    axios
      .get("/statistic/day")
      .then(({ data }) => {
        const addons = {
          injection: 0,
          coloring: 0,
          ointment: 0,
        };
        const needles = {
          isolated: {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
          },
          nonIsolated: {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
          },
        };
        data.addons.forEach((item) => {
          if (item.addon.ticket === "INJECTION") addons.injection = item.count;
          if (item.addon.ticket === "COLORING") addons.coloring = item.count;
          if (item.addon.ticket === "OINTMENT") addons.ointment = item.count;
        });
        data.needles.forEach((item) => {
          if (item.needle.type === "ISOLATED") {
            if (item.needle.number === 1) needles.isolated.first = item.count;
            if (item.needle.number === 2) needles.isolated.second = item.count;
            if (item.needle.number === 3) needles.isolated.third = item.count;
            if (item.needle.number === 4) needles.isolated.fourth = item.count;
          }
          if (item.needle.type === "NONISOLATED") {
            if (item.needle.number === 1)
              needles.nonIsolated.first = item.count;
            if (item.needle.number === 2)
              needles.nonIsolated.second = item.count;
            if (item.needle.number === 3)
              needles.nonIsolated.third = item.count;
            if (item.needle.number === 4)
              needles.nonIsolated.fourth = item.count;
          }
        });

        const currentStat = { ...data, addons: addons, needles: needles };
        setDayStat(currentStat);
      })
      .catch((e) => console.log(e));
  const getMonthStatistic = () =>
    axios
      .get("/statistic/month")
      .then(({ data }) => {
        console.log("month", data);
        const addons = {
          injection: 0,
          coloring: 0,
          ointment: 0,
        };
        const needles = {
          isolated: {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
          },
          nonIsolated: {
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
          },
        };

        data.addons.forEach((item) => {
          if (item.addon.ticket === "INJECTION") addons.injection = item.count;
          if (item.addon.ticket === "COLORING") addons.coloring = item.count;
          if (item.addon.ticket === "OINTMENT") addons.ointment = item.count;
        });
        data.needles.forEach((item) => {
          if (item.needle.type === "ISOLATED") {
            if (item.needle.number === 1) needles.isolated.first = item.count;
            if (item.needle.number === 2) needles.isolated.second = item.count;
            if (item.needle.number === 3) needles.isolated.third = item.count;
            if (item.needle.number === 4) needles.isolated.fourth = item.count;
          }
          if (item.needle.type === "NONISOLATED") {
            if (item.needle.number === 1)
              needles.nonIsolated.first = item.count;
            if (item.needle.number === 2)
              needles.nonIsolated.second = item.count;
            if (item.needle.number === 3)
              needles.nonIsolated.third = item.count;
            if (item.needle.number === 4)
              needles.nonIsolated.fourth = item.count;
          }
        });

        const currentStat = { ...data, addons: addons, needles: needles };
        setMonthStat(currentStat);
      })
      .catch((e) => console.log(e));
  const getMastersStatistic = () => {
    axios
      .get("/statistic/masters")
      .then(({ data }) => setMastersStat(data))
      .catch((e) => console.log(e));
  };
  const getFullStat = () => {
    getDayStatistic();
    getMonthStatistic();
    getMastersStatistic();
  };

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
  const getTimeTable = () => {
    axios("/masters/timetable")
      .then(({ data }) => {
        setTimeTable(data);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    getAppointments();
    getMasters();
    getClients();
    getTimeTable();
    getFullStat();
  }, []);

  const [clientsSearchValue, setClientsSearchValue] = React.useState("");
  const [visibleAddTimetableModal, setVisibleAddTimetableModal] =
    React.useState(false);

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
          mastersStat,
          monthStat,
          dayStat,
          getFullStat,
          sortVisibleAppointmentsList,
          setSortVisibleAppointmentsList,
          pickerStatVisible,
          setPickerStatVisible,
          visibleAddTimetableModal,
          setVisibleAddTimetableModal,
          timeTable,
          setTimeTable,
          getTimeTable,
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
