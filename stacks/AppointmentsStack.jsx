import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Context } from "../context";

const Stack = createNativeStackNavigator();

import { AppointmentsScreen, AppointmentScreen } from "../screens/index";
import styleForHeader from "./style";

const AppointmentsStack = ({ navigation }) => {
  const { setVisibleAppointmentsModel, setSortVisibleAppointmentsList } =
    React.useContext(Context);
  return (
    <Stack.Navigator initialRouteName="AppointmentsScreen">
      <Stack.Screen
        name="AppointmentsScreen"
        component={AppointmentsScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Приемы</Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setVisibleAppointmentsModel(true)}>
              <Ionicons name="add" size={26} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ ...styleForHeader.iconsWrapper, width: 100 }}
              onPress={() => setSortVisibleAppointmentsList(true)}
            >
              <Text style={styleForHeader.sideText}>Мастера</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={() => ({
          headerRight: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => setVisibleClientsReductModal(true)}
            >
              <Text style={styleForHeader.personInfoHeaderSideText}>Изм.</Text>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={styleForHeader.personInfo}>Карта приема</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => {
                navigation.navigate("AppointmentsScreen");
              }}
            >
              <FontAwesome5 name="chevron-left" size={21} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerTransparent: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStack;
