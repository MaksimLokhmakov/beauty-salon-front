import React from "react";
import { View, Text } from "react-native";

import table from "./style";

const Table = ({
  firstLabel = "firstLabel",
  secondLabel,
  thirdLabel,
  fourthLabel,
  firstValue = () => false,
  secondValue = () => false,
  thirdValue = () => false,
  fourthValue = () => false,
  title,
  numberOfRows = false,
  width = "auto",
}) => {
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
      {title && <Text style={table.title}>{title}</Text>}
      <View style={table.wrapper}>
        <View style={table.line}></View>
        {THIRD_ROW && <View style={{ ...table.line, top: 59 }}></View>}
        {FOURTH_ROW && <View style={{ ...table.line, top: 88.5 }}></View>}

        <View style={{ ...table.labelsWrapper, height: HEIGHT }}>
          <Text style={{ ...table.label, width: width }}>{firstLabel}</Text>
          {SECOND_ROW && (
            <Text style={{ ...table.label, width: width }}>{secondLabel}</Text>
          )}
          {THIRD_ROW && (
            <Text style={{ ...table.label, width: width }}>{thirdLabel}</Text>
          )}
          {FOURTH_ROW && (
            <Text style={{ ...table.label, width: width }}>{fourthLabel}</Text>
          )}
        </View>
        <View style={{ ...table.valuesWrapper, height: HEIGHT }}>
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
