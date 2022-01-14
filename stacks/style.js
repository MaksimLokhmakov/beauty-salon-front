import { StyleSheet } from "react-native";

const styleForHeader = StyleSheet.create({
  mainPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "#C2185B",
    top: -5,
  },
  personInfo: {
    fontSize: 20,
    fontWeight: "400",
    color: "#C2185B",
  },
  personInfoHeaderSideText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#C2185B",
  },
  iconsWrapper: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});

export default styleForHeader;
