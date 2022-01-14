import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

import { MonthlyReportingScreen } from "../screens/index";
import styleForHeader from "./style";

const MonthlyReportStack = () => {
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
        }}
      />
    </Stack.Navigator>
  );
};

export default MonthlyReportStack;
