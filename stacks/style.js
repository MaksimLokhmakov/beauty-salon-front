import { StyleSheet } from "react-native";

const styleForHeader = StyleSheet.create({
  mainPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 17,
    fontWeight: "600",
    color: "#212",
  },
  personInfo: {
    fontSize: 20,
    fontWeight: "400",
    color: "#212",
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
  sideText: {
    color: "#C2185B",
    fontSize: 16,
  },
});

export default styleForHeader;
