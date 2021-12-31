import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

import { MastersScreen, MasterScreen } from "../screens/index";
import styleForHeader from "./style";

const MastersStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="MastersScreen">
      <Stack.Screen
        name="MastersScreen"
        component={MastersScreen}
        options={{
          headerTitle: () => (
            <Text style={styleForHeader.mainPage}>Мастера</Text>
          ),
        }}
      />
      <Stack.Screen
        name="MasterScreen"
        component={MasterScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text style={styleForHeader.personInfo}>
              {route.params.master.fullName}
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ position: "reletive", top: 10 }}
              onPress={() => {
                navigation.goBack();
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

export default MastersStack;
