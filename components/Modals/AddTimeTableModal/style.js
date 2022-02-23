import { StyleSheet } from "react-native";

const addTableStyle = StyleSheet.create({
  buttonConteiner: {
    top: -5,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 0.5,
    paddingVertical: 4,
    // paddingTop: 2,
    paddingBottom: 8,
    justifyContent: "flex-start",
  },
  button: {
    width: "100%",
  },
  buttonText: {
    color: "#007aff",
    fontSize: 16,
  },
  paddingTopTen: {
    paddingTop: 10,
  },
  fullWidth: {
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  searchBarWrapper: {
    paddingTop: 0,
    width: "105%",
    right: "2.5%",
  },
  iconWrapper: {
    width: 23,
    height: 23,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  rowDerection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
  },
});

export default addTableStyle;
