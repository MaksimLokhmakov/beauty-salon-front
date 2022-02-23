import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Avatar from "../shared/Avatar";
import Table from "../shared/Table";
import HeaderInfo from "./style";

const PersonInfoHeader = ({ item }) => {
  const phoneValue = (
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.tel}`)}>
      <Text style={{ fontSize: 16, color: "#1976D2" }}>{item.tel}</Text>
    </TouchableOpacity>
  );
  const secondValue = item.percent ? (
    <Text style={{ fontSize: 15, color: "#757575" }}>
      {(item.percent * 100).toFixed() + "%"}
    </Text>
  ) : (
    <Text style={{ fontSize: 15, color: "#757575" }}>5</Text>
  );
  const secondLabel = item.percent ? "процент " : "посещений";
  const nameSplit = item.name.split(" ");
  const firstName = nameSplit[0];
  const secondName = nameSplit[1] ? nameSplit[1] : "";
  const tableData = {
    data: [
      {
        label: <Text>сотовый </Text>,
        value: phoneValue,
      },
      {
        label: <Text>{secondLabel}</Text>,
        value: secondValue,
      },
    ],
  };

  return (
    <View style={HeaderInfo.CardInfoWrapper}>
      <View style={HeaderInfo.rowDerection}>
        <Avatar fullName={item.name} width={85} height={85} size={36} />
        <View style={HeaderInfo.nameConteiner}>
          <Text style={HeaderInfo.text}>{firstName}</Text>
          <View style={HeaderInfo.line} />
          <Text style={HeaderInfo.text}>{secondName}</Text>
        </View>
      </View>

      <Table tableValues={tableData} />
    </View>
  );
};

export default PersonInfoHeader;
