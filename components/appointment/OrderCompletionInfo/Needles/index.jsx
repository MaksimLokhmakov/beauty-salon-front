import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Label from "../../../shared/Label";
import Table from "../../../shared/Table";
import Screen from "../../../../screens/style";
import localeStyle from "./style";

const index = ({ isEditable, needle }) => {
  const [currentNeedle, setCurrentNeedle] = React.useState(needle);

  console.log("NEEDLES", needle);

  const NEEDLE_TYPE = {
    isolated: "isolated",
    nonisolated: "nonisolated",
  };
  const NEEDLS = [1, 2, 3, 4];

  const onChangeNeedle = (currentNeedle, currentNeedleType) => {
    isEditable &&
      setCurrentNeedle({ needle: currentNeedle, type: currentNeedleType });
  };

  const noneIsoletedNeedlesTebleData = {
    title: "Обыч. иглы",
    data: NEEDLS.map((needle) => {
      const isPicked =
        currentNeedle !== null &&
        currentNeedle.type === NEEDLE_TYPE.nonisolated &&
        currentNeedle.needle === needle;

      return {
        label: <Label width={25}>№{needle}</Label>,
        value: (
          <TouchableOpacity
            onPress={() => onChangeNeedle(needle, NEEDLE_TYPE.nonisolated)}
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={isPicked ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      };
    }),
  };
  const isolatedNeedlesTableData = {
    title: "Изол. иглы",
    data: NEEDLS.map((needle) => {
      const isPicked =
        currentNeedle !== null &&
        currentNeedle.type === NEEDLE_TYPE.isolated &&
        currentNeedle.needle === needle;

      return {
        label: <Label width={25}>№{needle}</Label>,
        value: (
          <TouchableOpacity
            onPress={() => onChangeNeedle(needle, NEEDLE_TYPE.isolated)}
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={isPicked ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      };
    }),
  };

  return (
    <View style={localeStyle.wrapper}>
      <View style={{ ...Screen.infoCardWrapper, marginRight: 5 }}>
        <Table tableValues={noneIsoletedNeedlesTebleData} />
      </View>

      <View style={{ ...Screen.infoCardWrapper, marginLeft: 5 }}>
        <Table tableValues={isolatedNeedlesTableData} />
      </View>
    </View>
  );
};

export default index;
