import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  AppointmentCard,
  PersonInfoHeader,
  Table,
  Label,
} from "../../components";
import Screen from "../style";

// TODO:  ДОБАВИТЬ ОБЩУЮ СУММУ ОПЛАТЫ ЗА ПРИЕМ
// TODO: ДОБАВИТЬ ПРИБЫЛЬ САЛОНА ЗА ПРИЕМ И ПРИБЫЛЬ МАСТЕРА ЗА ПРИЕМ
// TODO: ПЕРЕДЕЛАТЬ ИЗМЕНИЯЕМЫЕ ПОЛЯ НА ИНПУТЫ
// TODO: ДОБАВИТЬ КНОПНКУ "ЗАВЕРШИТЬ ПРИЕМ В КОНЕЦ СТРАНИЦЫ"

const AppointmentScreen = ({ route }) => {
  const { appointment } = route.params;
  const [normalNeedles, setNormalNeedles] = React.useState(null);
  const [specialNeedles, setSpecialNeedles] = React.useState(null);

  const setNeedls = (setState, nullifyState, needle) => {
    setState((prev) => (prev === needle ? null : needle));
    nullifyState(null);
  };

  const phoneValue = (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${appointment.master.tel}`)}
    >
      <Text style={{ fontSize: 14, color: "#1976D2" }}>
        {appointment.master.tel}
      </Text>
    </TouchableOpacity>
  );

  const [checked, setChecked] = React.useState({
    injection: false,
    ointment: false,
    coloring: false,
  });

  const masterTableInfo = {
    title: "Мастер:",
    data: [
      {
        label: <Label>имя/фам.</Label>,
        value: <Text>{appointment.master.name}</Text>,
      },
      { label: <Label>сотовый</Label>, value: phoneValue },
    ],
  };

  const needles = [1, 2, 3, 4];
  const noneIsoletedNeedlesTebleData = {
    title: "Обыч. иглы",
    data: needles.map((needle) => {
      return {
        label: <Label>№{needle}</Label>,
        value: (
          <TouchableOpacity
            onPress={() =>
              setNeedls(setNormalNeedles, setSpecialNeedles, needle)
            }
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={normalNeedles === needle ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      };
    }),
  };
  const isolatedNeedlesTableData = {
    title: "Изол. иглы",
    data: needles.map((needle) => {
      return {
        label: <Label>№{needle}</Label>,
        value: (
          <TouchableOpacity
            onPress={() =>
              setNeedls(setSpecialNeedles, setNormalNeedles, needle)
            }
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={specialNeedles === needle ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      };
    }),
  };

  const addonsTableData = {
    title: "Доп. услуги",
    data: [
      {
        label: <Label>инъекционная анестезия</Label>,
        value: (
          <TouchableOpacity
            onPress={() =>
              setChecked((prev) => ({
                ...prev,
                injection: !prev.injection,
              }))
            }
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked.injection ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      },
      {
        label: <Label>аппликационная анестезия</Label>,
        value: (
          <TouchableOpacity
            onPress={() =>
              setChecked((prev) => ({
                ...prev,
                ointment: !prev.ointment,
              }))
            }
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked.ointment ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      },
      {
        label: <Label>окрашивание</Label>,
        value: (
          <TouchableOpacity
            onPress={() =>
              setChecked((prev) => ({
                ...prev,
                coloring: !prev.coloring,
              }))
            }
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked.coloring ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      },
    ],
  };

  //!  так передавать на сервер
  //!  "needle": {
  //! "type": "isolated/nonisolated"
  //! "number": "3"
  //!  }

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={appointment.client} appointment />
      <View style={Screen.infoCardWrapper}>
        <Table tableValues={masterTableInfo} />
      </View>
      <AppointmentCard item={appointment} />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ ...Screen.infoCardWrapper, marginRight: 5 }}>
          <Table tableValues={noneIsoletedNeedlesTebleData} />
        </View>

        <View style={{ ...Screen.infoCardWrapper, marginLeft: 5 }}>
          <Table tableValues={isolatedNeedlesTableData} />
        </View>
      </View>

      <View style={Screen.infoCardWrapper}>
        <Table tableValues={addonsTableData} />
      </View>
    </ScrollView>
  );
};

export default AppointmentScreen;
