import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Avatar from "../shared/Avatar";
import Table from "../shared/Table";
import Label from ".././shared/Label";
import HeaderInfo from "./style";

const PersonInfoHeader = ({ item, wrapperStyle = {} }) => {
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
    <Text style={{ fontSize: 15, color: "#757575" }}>{item.ordersCount}</Text>
  );
  const secondLabel = item.percent ? "процент " : "посещений";
  const nameSplit = item.name.split(" ");
  const firstName = nameSplit[0];
  const secondName = nameSplit[1] ? nameSplit[1] : "";
  const tableData = {
    data:
      item.percent || item.ordersCount || item.ordersCount === 0
        ? [
            {
              label: <Label>сотовый </Label>,
              value: phoneValue,
            },
            {
              label: <Label>{secondLabel}</Label>,
              value: secondValue,
            },
          ]
        : [
            {
              label: <Label>сотовый </Label>,
              value: phoneValue,
            },
          ],
  };

  return (
    <View style={[HeaderInfo.CardInfoWrapper, wrapperStyle]}>
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
