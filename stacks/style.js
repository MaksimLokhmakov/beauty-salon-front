import { StyleSheet } from "react-native";

const styleForHeader = StyleSheet.create({
  mainPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#FF4081",
  },
  personInfo: {
    position: "relative",
    top: 10,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 24,
    fontWeight: "500",
    color: "#FF4081",
  },
});

export default styleForHeader;
