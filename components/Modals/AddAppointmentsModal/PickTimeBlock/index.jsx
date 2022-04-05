import React from "react";
import { View, Text, FlatList } from "react-native";
import AddItemConteiner from "../../../shared/AddItemConteiner";
import Card from "../../../appointment/AppointmentCard/style";
import Style from "./style";

const PickTimeBlock = ({ idleTime, handleTimePick }) => {
  const pickTime = (currentTime) => {
    handleTimePick(currentTime);
  };
  const getKey = (item) => item.start + item.finish;
  const getRenderItem = ({ item, index }) => {
    const lastElement = idleTime.length - 1 === index;

    return (
      <AddItemConteiner
        onPress={pickTime}
        item={item}
        lastElement={lastElement}
      />
    );
  };

  return (
    <View style={[Card.Wrapper, Style.wrapper]}>
      <View style={Style.label}>
        <Text style={Style.text}>Доступное время: </Text>
      </View>

      <FlatList
        data={idleTime}
        keyExtractor={getKey}
        renderItem={getRenderItem}
      />
    </View>
  );
};

export default PickTimeBlock;
