import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Context } from "../../context";

import table from "./style";

const Table = ({
  two = false,
  backgroundColor = "#fff",
  editable,
  onEdit,
  item = false,
  firstLabel = () => false,
  secondLabel = () => false,
  thirdLabel = () => false,
  fourthLabel = () => false,
  firstValue = () => false,
  secondValue = () => false,
  thirdValue = () => false,
  fourthValue = () => false,
  title,
  numberOfRows = false,
  width = "auto",
}) => {
  const { setVisibleAddTimetableModal } = React.useContext(Context);
  const NUMBER_OF_ROWS = numberOfRows;
  const HEIGHT =
    numberOfRows === 2
      ? 60
      : numberOfRows === 3
      ? 90
      : numberOfRows === 4
      ? 120
      : 30;

  const SECOND_ROW =
    NUMBER_OF_ROWS === 2 || NUMBER_OF_ROWS === 3 || NUMBER_OF_ROWS === 4;

  const THIRD_ROW = NUMBER_OF_ROWS === 3 || NUMBER_OF_ROWS === 4;

  const FOURTH_ROW = NUMBER_OF_ROWS === 4;

  return (
    <>
      {title && (
        <View style={{ flexDirection: "row" }}>
          <Text style={table.title}>{title}</Text>
          {editable && (
            <TouchableOpacity
              onPress={() => {
                onEdit(item);
                setVisibleAddTimetableModal(true);
              }}
              style={{ right: 13, width: 30, height: 30 }}
            >
              <MaterialIcons name="more-vert" size={24} color="#b0aeae" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={table.wrapper}>
        <View style={table.line}></View>
        {THIRD_ROW && <View style={{ ...table.line, top: 59 }}></View>}
        {FOURTH_ROW && <View style={{ ...table.line, top: 88.5 }}></View>}

        <View
          style={{
            ...table.labelsWrapper,
            height: HEIGHT,
            backgroundColor: backgroundColor,
          }}
        >
          <Text style={{ ...table.label, width: width }}>{firstLabel()}</Text>
          {SECOND_ROW && (
            <Text style={{ ...table.label, width: width }}>
              {secondLabel()}
            </Text>
          )}
          {THIRD_ROW && (
            <Text style={{ ...table.label, width: width }}>{thirdLabel()}</Text>
          )}
          {FOURTH_ROW && (
            <Text style={{ ...table.label, width: width }}>
              {fourthLabel()}
            </Text>
          )}
        </View>
        <View
          style={{
            ...table.valuesWrapper,
            height: HEIGHT,
            backgroundColor: backgroundColor,
            flex: 1,
          }}
        >
          <View>{firstValue()}</View>
          {SECOND_ROW && <View>{secondValue()}</View>}
          {THIRD_ROW && <View>{thirdValue()}</View>}
          {FOURTH_ROW && <View>{fourthValue()}</View>}
        </View>
      </View>
    </>
  );
};

export default Table;
