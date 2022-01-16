import React from "react";
import { View, Text } from "react-native";

import table from "./style";

const Table = ({
  firstLabel = "firstLabel",
  secondLabel = "secondLabel",
  firstValue = () => <Text>firstValue</Text>,
  secondValue = () => <Text>secondValue</Text>,
  title,
  one,
  width = "auto",
}) => {
  return (
    <>
      {title && <Text style={table.title}>{title}</Text>}
      <View style={table.wrapper}>
        <View style={table.line}></View>
        <View style={{ ...table.labelsWrapper, height: one ? 30 : 60 }}>
          <Text style={{ ...table.label, width: width }}>{firstLabel}</Text>
          {!one && (
            <Text style={{ ...table.label, width: width }}>{secondLabel}</Text>
          )}
        </View>
        <View style={{ ...table.valuesWrapper, height: one ? 30 : 60 }}>
          <View>{firstValue()}</View>
          {!one && <View>{secondValue()}</View>}
        </View>
      </View>
    </>
  );
};

export default Table;
