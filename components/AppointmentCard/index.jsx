import React from "react";
import { View, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MainButton, Bardge } from "..";

import Card from "./style";

const AppointmentCard = ({ client, last = 0, inMasterScreen = false }) => {
  return (
    <View style={{ ...Card.wrapper, marginBottom: last }}>
      {inMasterScreen && (
        <View style={{ ...Card.blocksWrapper, marginBottom: 8 }}>
          <View style={Card.textIconWrapper}>
            <MaterialCommunityIcons
              style={{ marginRight: 7 }}
              name="face-profile"
              size={24}
              color="#b0aeae"
            />
            <Text
              style={{
                color: "#212121",
                fontSize: 18,
                fontWeight: "300",
                left: 0,
              }}
            >
              Имя:{" "}
              <Text style={Card.headerText}>
                {client.fullName.split(" ")[0]}
              </Text>
            </Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={22} color="#b0aeae" />
        </View>
      )}

      <View style={Card.blocksWrapper}>
        <View style={{ ...Card.blocksWrapper, marginBottom: 8 }}>
          <MaterialCommunityIcons
            name="chart-areaspline"
            size={24}
            color="#b0aeae"
          />

          <Text
            style={{
              color: "#212121",
              fontSize: 18,
              fontWeight: "300",
              left: 5,
            }}
          >
            Зона:{" "}
            <Text
              style={{
                fontWeight: "400",
                fontSize: 18,
                color: inMasterScreen ? "#212121" : "#FF4081",
              }}
            >
              {client.area}
            </Text>
          </Text>
        </View>
        {!inMasterScreen && (
          <Ionicons
            style={{ top: -4 }}
            name="ellipsis-vertical"
            size={22}
            color="#b0aeae"
          />
        )}
      </View>

      <View style={Card.blocksWrapper}>
        <View
          style={{
            ...Card.blocksWrapper,
            marginBottom: 15,
          }}
        >
          <Ionicons name="time-outline" size={24} color="#b0aeae" />
          <Text
            style={{
              color: "#212121",
              fontSize: 18,
              fontWeight: "300",
              left: 5,
            }}
          >
            Длительность:{" "}
            <Text style={{ fontWeight: "400" }}>{client.duration} ч.</Text>
          </Text>
        </View>
      </View>

      <View style={Card.blocksWrapper}>
        <Bardge color="#b0aeae">{client.date}</Bardge>
        {inMasterScreen && (
          <MainButton
            bColor="#4ee91b90"
            flex={0.32}
            onPress={() => Linking.openURL(`tel:${client.phoneNumber}`)}
          />
        )}
      </View>
    </View>
  );
};

export default AppointmentCard;
