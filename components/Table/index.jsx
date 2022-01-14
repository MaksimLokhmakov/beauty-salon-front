import React from "react";
import { View, Text } from "react-native";

import table from "./style";

const Table = ({
  firstLabel = "firstLabel",
  secondLabel = "secondLabel",
  firstValue = () => <Text>firstValue</Text>,
  secondValue = () => <Text>secondValue</Text>,
  title,
}) => {
  return (
    <>
      {title && <Text style={table.title}>{title}</Text>}
      <View style={table.wrapper}>
        <View style={table.line}></View>
        <View style={table.labelsWrapper}>
          <Text style={table.label}>{firstLabel}</Text>
          <Text style={table.label}>{secondLabel}</Text>
        </View>
        <View style={table.valuesWrapper}>
          <View>{firstValue()}</View>
          <View>{secondValue()}</View>
        </View>
      </View>
    </>
  );
};

export default Table;
