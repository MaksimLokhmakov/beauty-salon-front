import { View, Text, TextInput } from "react-native";
import React from "react";
import Label from "../../../shared/Label";
import Table from "../../../shared/Table";
import Screen from "../../../../screens/style";
import Style from "./style";

const index = ({ isEditable, price, setPrice }) => {
  const onPriceChange = (e) => setPrice(e);

  const priceTableInfo = {
    title: !isEditable && "Цена:",
    data: [
      {
        label: <Label width={isEditable ? 50 : "auto"}>цена</Label>,
        value: isEditable ? (
          <TextInput
            autoFocus
            value={price}
            onChangeText={onPriceChange}
            type="numeric"
            style={Style.input}
          />
        ) : (
          <Text>{price !== null ? price : "-"}</Text>
        ),
      },
    ],
  };

  return (
    <View style={{ ...Screen.infoCardWrapper, flex: 0 }}>
      <Table tableValues={priceTableInfo} />
    </View>
  );
};

export default index;
