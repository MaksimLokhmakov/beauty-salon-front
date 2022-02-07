import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { Context } from "../context";

const Stack = createNativeStackNavigator();

import { MonthlyReportingScreen } from "../screens/index";
import styleForHeader from "./style";

const MonthlyReportStack = () => {
  const { setPickerStatVisible, reportingPicker } = React.useContext(Context);
  return (
    <Stack.Navigator initialRouteName="MonthlyReportingScreen">
      <Stack.Screen
        name="MonthlyReportingScreen"
        component={MonthlyReportingScreen}
        options={{
          headerTransparent: false,
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Отчетность</Text>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => setPickerStatVisible(true)}>
              <Text style={styleForHeader.sideText}>{reportingPicker}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MonthlyReportStack;
