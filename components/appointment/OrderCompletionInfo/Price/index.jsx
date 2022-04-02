import { View, Text, TextInput } from "react-native";
import React from "react";
import Label from "../../../shared/Label";
import Table from "../../../shared/Table";
import Screen from "../../../../screens/style";

const index = ({ isEditable, value }) => {
  const [price, setPrice] = React.useState(value);

  const onPriceChange = (e) => setPrice(e);

  const priceTableInfo = {
    title: !isEditable && "Цена:",
    data: [
      {
        label: <Label width={isEditable ? 50 : "auto"}>цена</Label>,
        value: isEditable ? (
          <TextInput
            value={price}
            onChangeText={onPriceChange}
            type="numeric"
            style={{
              justifyContent: "center",
              width: "100%",
              height: 30,
              backgroundColor: "#fff",
              fontSize: 16,
            }}
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
