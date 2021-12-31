import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

import { ClientsScreen, ClientSrceen } from "../screens/index";
import styleForHeader from "./style";

const ClientsStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ClientsScreen">
      <Stack.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Клиенты</Text>
          ),
        }}
      />
      <Stack.Screen
        name="ClientSrceen"
        component={ClientSrceen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text style={styleForHeader.personInfo}>
              {route.params.client.fullName}
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ position: "reletive", top: 10 }}
              onPress={() => {
                navigation.navigate("ClientsScreen");
              }}
            >
              <Ionicons name="chevron-back-sharp" size={24} color="#FF4081" />
            </TouchableOpacity>
          ),
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default ClientsStack;
