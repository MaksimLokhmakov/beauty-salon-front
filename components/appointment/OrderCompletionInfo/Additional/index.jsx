import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Label from "../../../shared/Label";
import Table from "../../../shared/Table";
import Screen from "../../../../screens/style";

const index = ({ isEditable, checked, setChecked }) => {
  // const [checked, setChecked] = React.useState(addons);

  const onPickAdditional = (type) => {
    isEditable &&
      setChecked((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
  };

  const getTableData = () => {
    const result = [];
    function getType(key) {
      switch (key) {
        case "injection":
          return "инъекционная анестезия";
        case "ointment":
          return "аппликационная анестезия";
        case "coloring":
          return "окрашивание";
      }
    }

    for (let key in checked) {
      const isChecked = checked[key] ? "#5bdd8f" : "#ebecef";
      result.push({
        label: <Label>{getType(key)}</Label>,
        value: (
          <TouchableOpacity
            style={{ height: 25, justifyContent: "center" }}
            onPress={() => onPickAdditional(key)}
          >
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={isChecked}
            />
          </TouchableOpacity>
        ),
      });
    }

    return result;
  };

  const addonsTableData = {
    title: "Доп. услуги",
    data: getTableData(),
  };

  return (
    <View style={{ ...Screen.infoCardWrapper, flex: 0 }}>
      <Table tableValues={addonsTableData} />
    </View>
  );
};

export default index;
