import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

import { AppointmentsScreen } from "../screens/index";
import styleForHeader from "./style";

const AppointmentsStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="AppointmentsScreen">
      <Stack.Screen
        name="AppointmentsScreen"
        component={AppointmentsScreen}
        options={{
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Приемы</Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppointmentsStack;
