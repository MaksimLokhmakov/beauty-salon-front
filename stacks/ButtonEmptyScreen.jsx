import React from "react";
import {
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { LightSpeedInLeft, Layout } from "react-native-reanimated";

export default function ButtonEmptyScreen() {
  const [items, setItems] = React.useState([]);
  const addItem = () => {
    setItems([{ name: "Item", id: Date.now().toString() }].concat(items));
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addButton = (
    <TouchableOpacity onPress={addItem}>
      <Text>Добавить</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingTop: 100 }}>
      <Animated.FlatList
        itemLayoutAnimation={Layout.springify()}
        data={items}
        renderItem={({ item }) => (
          <Animated.View
            // layout={Layout.springify()}
            entering={LightSpeedInLeft}
            key={item.id}
            style={{
              width: "100%",
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text>{item.id}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
      {addButton}
    </View>
  );
}
