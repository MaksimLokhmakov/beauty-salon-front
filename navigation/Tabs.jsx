import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

import {
  MastersStack,
  AppointmentsStack,
  ClientsStack,
  MonthlyReportingStack,
  ButtonEmptyScreen,
} from "../stacks/index";
import { Context } from "../context";
import { PlusButton } from "../components";

const Tabs = () => {
  const {
    setVisibleMastersModel,
    setVisibleAppointmentsModel,
    setVisibleClientsModel,
  } = React.useContext(Context);

  const navigation = useNavigation();
  const showModal = () => {
    const { name } = navigation.getCurrentRoute();

    switch (name) {
      case "MastersScreen":
        return setVisibleMastersModel(true);

      case "AppointmentsScreen":
        return setVisibleAppointmentsModel(true);

      case "ClientsScreen":
        return setVisibleClientsModel(true);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="AppointmentsStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#b0aeae",
        tabBarActiveTintColor: "#FF4081",
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          height: 70,
          ...TabsStyle.shadow,
          opacity: 0.97,
        },
      }}
    >
      <Tab.Screen
        name="MastersStack"
        component={MastersStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <Ionicons name="ios-people" size={25} color={color} />
              <Text
                style={{
                  fontSize: 14,
                  color: color,
                  top: -3,
                }}
              >
                Мастера
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ClientsStack"
        component={ClientsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <Ionicons name="body" size={25} color={color} />
              <Text
                style={{
                  fontSize: 14,
                  color: color,
                  top: -3,
                }}
              >
                Клиенты
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ButtonEmptyScreen"
        component={ButtonEmptyScreen}
        options={{
          tabBarButton: () => <PlusButton openAddModalScreen={showModal} />,
        }}
      />
      <Tab.Screen
        name="AppointmentsStack"
        component={AppointmentsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <Ionicons name="book" size={25} color={color} />
              <Text
                style={{
                  fontSize: 14,
                  color: color,
                  top: -3,
                }}
              >
                Приемы
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MonthlyReportingStack"
        component={MonthlyReportingStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <Ionicons name="information-circle" size={25} color={color} />
              <Text
                style={{
                  fontSize: 14,
                  color: color,
                  top: -3,
                }}
              >
                Отчеты
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabsStyle = StyleSheet.create({
  shadow: {
    shadowColor: "#b0aeae",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Tabs;
