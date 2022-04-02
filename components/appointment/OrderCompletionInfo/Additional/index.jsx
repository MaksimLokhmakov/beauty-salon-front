import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Label from "../../../shared/Label";
import Table from "../../../shared/Table";
import Screen from "../../../../screens/style";

const index = ({ isEditable, addons }) => {
  const [checked, setChecked] = React.useState(addons);

  console.log("EDDITIONAL", addons);

  const onPickAdditional = (type) => {
    isEditable &&
      setChecked((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
  };

  const func = () => {
    const result = [];

    for (let key in checked) {
      const addonType =
        key === "injection"
          ? "инъекционная анестезия"
          : key === "ointment"
          ? "аппликационная анестезия"
          : "окрашивание";

      result.push({
        label: <Label>{addonType}</Label>,
        value: (
          <TouchableOpacity onPress={() => onPickAdditional(key)}>
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="check"
              size={18}
              color={checked[key] ? "#5bdd8f" : "#ebecef"}
            />
          </TouchableOpacity>
        ),
      });
    }

    return result;
  };

  const addonsTableData = {
    title: "Доп. услуги",
    data: func(),
  };

  return (
    <View style={{ ...Screen.infoCardWrapper, flex: 0 }}>
      <Table tableValues={addonsTableData} />
    </View>
  );
};

export default index;
