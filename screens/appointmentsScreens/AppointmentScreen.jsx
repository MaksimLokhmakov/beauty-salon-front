import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import {
  AppointmentCard,
  PersonInfoHeader,
  Table,
  Label,
  OrderCompletionInfo,
} from "../../components";
import Screen from "../style";

// TODO:  ДОБАВИТЬ ОБЩУЮ СУММУ ОПЛАТЫ ЗА ПРИЕМ
// TODO: ДОБАВИТЬ ПРИБЫЛЬ САЛОНА ЗА ПРИЕМ И ПРИБЫЛЬ МАСТЕРА ЗА ПРИЕМ
// TODO: ПЕРЕДЕЛАТЬ ИЗМЕНИЯЕМЫЕ ПОЛЯ НА ИНПУТЫ
// TODO: ДОБАВИТЬ КНОПНКУ "ЗАВЕРШИТЬ ПРИЕМ В КОНЕЦ СТРАНИЦЫ"

const AppointmentScreen = ({ route }) => {
  const { appointment } = route.params;

  console.log(appointment);

  const phoneValue = (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${appointment.master.tel}`)}
    >
      <Text style={{ fontSize: 14, color: "#1976D2" }}>
        {appointment.master.tel}
      </Text>
    </TouchableOpacity>
  );

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

      <OrderCompletionInfo
        data={{
          addons: appointment.addons,
          price: appointment.price,
          needle: appointment.needle,
        }}
      />

      <TouchableOpacity onPress={() => console.log("Завершение")}>
        <View style={{ ...Screen.infoCardWrapper, paddingBottom: 10 }}>
          <Label style={{ fontSize: 18 }}>Завершить прием</Label>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentScreen;
