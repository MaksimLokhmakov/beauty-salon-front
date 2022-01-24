import { StyleSheet } from "react-native";

const clientModal = StyleSheet.create({
  buttonsWrapper: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#ebedf0",
    height: "auto",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#ebedf0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#22112234",
    borderBottomWidth: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "400",
  },
});

export default clientModal;
