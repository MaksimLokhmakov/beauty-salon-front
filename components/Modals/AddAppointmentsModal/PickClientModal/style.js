import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  buttonWrapper: {
    flex: 0,
    paddingHorizontal: 15,
    height: "auto",
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#C2185B",
  },
  modalWrapper: {
    position: "absolute",
    bottom: -10,
    flex: 0,
    width: "100%",
    height: "60%",
    paddingTop: 30,
    paddingHorizontal: 15,
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  searchBarWrapper: {
    top: -10,
    width: "100%",
  },
  searchBarInput: {
    width: "100%",
  },
  flatListWrapper: {
    backgroundColor: "#f1f3f4",
    flex: 0,
  },
});

export default Style;
