import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

import {
  MastersStack,
  AppointmentsStack,
  ClientsStack,
  MonthlyReportingStack,
  ButtonEmptyScreen,
} from "../stacks/index";
import TabsStyle from "./style";

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="AppointmentsStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#b0aeae",
        tabBarActiveTintColor: "#C2185B",
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="MastersStack"
        component={MastersStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <FontAwesome5 name="user-friends" size={20} color={color} />
              <Text
                style={{
                  ...TabsStyle.text,
                  color: color,
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
              <FontAwesome5 name="users" size={20} color={color} />
              <Text
                style={{
                  ...TabsStyle.text,
                  color: color,
                }}
              >
                Клиенты
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AppointmentsStack"
        component={AppointmentsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <FontAwesome5 name="book-open" size={20} color={color} />
              <Text
                style={{
                  ...TabsStyle.text,
                  color: color,
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
              <FontAwesome5 name="info-circle" size={20} color={color} />
              <Text
                style={{
                  ...TabsStyle.text,
                  color: color,
                }}
              >
                Отчеты
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ButtonEmptyScreen"
        component={ButtonEmptyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={TabsStyle.icon}>
              <FontAwesome5
                style={{ left: 3 }}
                name="user-plus"
                size={20}
                color={color}
              />
              <Text
                style={{
                  ...TabsStyle.text,
                  color: color,
                }}
              >
                Заявки
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
