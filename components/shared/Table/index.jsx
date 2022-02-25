import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import table from "./style";

const Table = ({
  backgroundColor = "#fff",
  editable,
  onEdit,
  item = false,
  tableValues = {
    data: [
      {
        label: (
          <TouchableOpacity>
            <Text>label</Text>
          </TouchableOpacity>
        ),
        value: <Text>value</Text>,
      },
    ],
  },
}) => {
  const handleEdit = () => {
    onEdit(item);
  };

  return (
    <>
      {tableValues.title && (
        <Animated.View entering={FadeInUp} style={table.rowDerection}>
          <Text style={table.title}>{tableValues.title}</Text>
          {editable && (
            <TouchableOpacity onPress={handleEdit} style={table.iconWrapper}>
              <MaterialIcons name="more-vert" size={24} color="#b0aeae" />
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
      <View style={{ ...table.wrapper, backgroundColor: backgroundColor }}>
        {tableValues.data.map((item, index) => {
          const lastElement = tableValues.data.length - 1 !== index;
          return (
            <Animated.View
              entering={FadeInUp}
              style={table.rowDerection}
              key={index}
            >
              <View style={table.label}>{item.label}</View>
              <View style={[table.line, table.vertical]}></View>
              <View style={table.value}>{item.value}</View>
              {lastElement && (
                <View style={[table.line, table.horisontal]}></View>
              )}
            </Animated.View>
          );
        })}
      </View>
    </>
  );
};

export default Table;
