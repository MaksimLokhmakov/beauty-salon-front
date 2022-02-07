import { StyleSheet } from "react-native";

const table = StyleSheet.create({
  labelsWrapper: {
    width: "auto",
    height: 60,
    justifyContent: "space-around",
    borderColor: "#BDBDBD",
    borderRightWidth: 0.5,
    // marginRight: 5,
  },
  valuesWrapper: {
    paddingLeft: 5,
    width: "100%",
    height: 60,
    justifyContent: "space-around",
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  label: {
    color: "#C2185B",
    marginRight: 5,
  },
  title: {
    width: "100%",
    fontSize: 16,
    color: "#212121",
    marginBottom: 5,
  },
  line: {
    zIndex: 2,
    height: 0.5,
    width: "100%",
    backgroundColor: "#BDBDBD",
    position: "absolute",
    top: 29.5,
  },
});

export default table;
