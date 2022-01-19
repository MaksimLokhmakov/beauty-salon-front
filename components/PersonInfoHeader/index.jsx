import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";

import HeaderInfo from "./style";
import Avatar from "../Avatar";
import Table from "../Table";

const PersonInfoHeader = ({ item, master = false }) => {
  const phoneValue = () => (
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.tel}`)}>
      <Text style={{ fontSize: 16, color: "#1976D2" }}>{item.tel}</Text>
    </TouchableOpacity>
  );

  const secondValue = () =>
    !master ? (
      <Text style={{ fontSize: 15, color: "#757575" }}>{5}</Text>
    ) : (
      <Text style={{ fontSize: 15, color: "#757575" }}>
        {(item.percent * 100).toFixed() + "%"}
      </Text>
    );

  return (
    <View style={HeaderInfo.CardInfoWrapper}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Avatar fullName={item.name} width={85} height={85} size={36} />
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={{ fontSize: 18 }}>{item.name.split(" ")[0]}</Text>
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#BDBDBD",
              marginTop: 5,
              marginBottom: 5,
            }}
          ></View>
          <Text style={{ fontSize: 18 }}>
            {item.name.split(" ")[1] ? item.name.split(" ")[1] : ""}
          </Text>
        </View>
      </View>

      <Table
        numberOfRows={2}
        firstLabel="сотовый"
        secondLabel={master ? "процент" : "посещений"}
        firstValue={phoneValue}
        secondValue={secondValue}
      />
    </View>
  );
};

export default PersonInfoHeader;
