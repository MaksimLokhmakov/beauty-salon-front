import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  wrapper: {
    left: 5,
    zIndex: 99,
    width: 200,
    backgroundColor: "#fff",
    maxHeight: 215,
    borderRadius: 18,
    paddingHorizontal: 5,
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.19,
    shadowRadius: 9.11,
    elevation: 14,
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    height: 35,
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default style;
