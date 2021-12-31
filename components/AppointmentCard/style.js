import { StyleSheet } from "react-native";

const Card = StyleSheet.create({
  wrapper: {
    width: 333,
    height: "auto",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#b0aeae",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 25,
    padding: 15,
  },
  blocksWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FF4081",
  },
  textIconWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
