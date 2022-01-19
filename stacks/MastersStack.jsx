import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Context } from "../context";

// ! Заменить икнонку!

const Stack = createNativeStackNavigator();

import { MastersScreen, MasterScreen, Timetable } from "../screens/index";
import styleForHeader from "./style";

const MastersStack = ({ navigation }) => {
  const { setVisibleMastersModel, setVisibleMastersReductModal } =
    React.useContext(Context);

  return (
    <Stack.Navigator initialRouteName="MastersScreen">
      <Stack.Screen
        name="MastersScreen"
        component={MastersScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Мастера</Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setVisibleMastersModel(true)}>
              <Ionicons name="add" size={26} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => {
                navigation.navigate("Timetable");
              }}
            >
              <Ionicons name="time-outline" size={24} color="#C2185B" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MasterScreen"
        component={MasterScreen}
        options={() => ({
          headerRight: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => setVisibleMastersReductModal(true)}
            >
              <Text style={styleForHeader.personInfoHeaderSideText}>Изм.</Text>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={styleForHeader.personInfo}>Карта мастера</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => {
                navigation.navigate("MastersScreen");
              }}
            >
              <FontAwesome5 name="chevron-left" size={21} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerTransparent: false,
        })}
      />
      <Stack.Screen
        name="Timetable"
        component={Timetable}
        options={() => ({
          presentation: "transparentModal",
          headerTitle: () => (
            <Text style={styleForHeader.personInfo}>Расписание</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styleForHeader.iconsWrapper}
              onPress={() => {
                navigation.navigate("MastersScreen");
              }}
            >
              <Ionicons name="close" size={24} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="add" size={26} color="#C2185B" />
            </TouchableOpacity>
          ),
          headerTransparent: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default MastersStack;
