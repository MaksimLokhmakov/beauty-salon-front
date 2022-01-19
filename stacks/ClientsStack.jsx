import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../context";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

import { ClientsScreen, ClientSrceen } from "../screens/index";
import styleForHeader from "./style";

const ClientsStack = ({ navigation }) => {
  const { setVisibleClientsModel, setVisibleClientsReductModal } =
    React.useContext(Context);
  return (
    <Stack.Navigator initialRouteName="ClientsScreen">
      <Stack.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Клиенты</Text>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setVisibleClientsModel(true)}
            >
              <Ionicons name="add" size={26} color="#C2185B" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ClientSrceen"
        component={ClientSrceen}
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
            <Text style={styleForHeader.personInfo}>Карта клиента</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => {
                navigation.navigate("ClientsScreen");
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

export default ClientsStack;
