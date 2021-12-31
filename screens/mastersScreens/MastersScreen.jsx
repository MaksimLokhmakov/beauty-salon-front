import React from "react";
import { View, FlatList } from "react-native";
import { Context } from "../../context";

import { PersonConteiner, AddMastersModal } from "../../components/index";
import Screen from "../style";

const MastersScreen = ({ navigation }) => {
  const { masters, getMasters } = React.useContext(Context);
  const [isLoading, setIsLoading] = React.useState(false);

  const refresh = () => {
    setIsLoading(true);
    getMasters();
    setIsLoading(false);
  };

  // React.useEffect(() => {
  //   refresh();
  // }, []);

  const toMasterInfo = (master) => {
    navigation.navigate("MasterScreen", { master });
  };

  return (
    <View style={Screen.wrapper}>
      <FlatList
        data={masters}
        keyExtractor={(item) => item.fullName}
        // onRefresh={() => {}}
        // refreshing={true}
        renderItem={({ item }) => (
          <PersonConteiner item={item} onPress={toMasterInfo} />
        )}
      />

      <AddMastersModal />
    </View>
  );
};

export default MastersScreen;
