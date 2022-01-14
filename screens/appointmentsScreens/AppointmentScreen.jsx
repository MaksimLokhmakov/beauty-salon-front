import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
  Text,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { AppointmentCard, PersonInfoHeader, Table } from "../../components";
import Screen from "../style";

const AppointmentScreen = ({ route }) => {
  const { appointment } = route.params;
  console.log(appointment);

  const phoneValue = () => (
    <TouchableOpacity
      onPress={() => Linking.openURL(`tel:${appointment.master.tel}`)}
    >
      <Text style={{ fontSize: 14, color: "#1976D2" }}>
        {appointment.master.tel}
      </Text>
    </TouchableOpacity>
  );

  const [checked, setChecked] = React.useState(false);

  return (
    <ScrollView
      style={{ backgroundColor: "#f1f3f4" }}
      showsVerticalScrollIndicator={false}
    >
      <PersonInfoHeader item={appointment.client} appointment />
      <View style={Screen.infoCardWrapper}>
        <Table
          title="Мастер:"
          firstLabel="имя/фам."
          firstValue={() => <Text>{appointment.master.name}</Text>}
          secondLabel="сотовый"
          secondValue={phoneValue}
        />
      </View>

      <AppointmentCard item={appointment} />

      <View style={Screen.infoCardWrapper}>
        <View style={{ top: 0, height: 55 }}>
          <Table
            title="Доп. услуги"
            firstLabel="инъекционная анестезия    "
            firstValue={() => (
              <FontAwesome5
                style={{ marginRight: 5 }}
                name="check"
                size={18}
                color={checked ? "#C2185B" : "#ebecef"}
              />
            )}
            secondLabel=""
            secondValue={() => <Text></Text>}
          />
        </View>
        <Table
          firstLabel="аппликационная анестезия"
          firstValue={() => (
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked ? "#C2185B" : "#ebecef"}
            />
          )}
          secondLabel="окрашивание                        "
          secondValue={() => (
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked ? "#C2185B" : "#ebecef"}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AppointmentScreen;
