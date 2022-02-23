import { StyleSheet } from "react-native";

const table = StyleSheet.create({
  wrapper: {
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  label: {
    color: "#C2185B",
    paddingRight: 5,
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    paddingLeft: 5,
    paddingVertical: 3,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    width: "100%",
    fontSize: 16,
    color: "#212121",
    marginBottom: 5,
  },
  line: {
    zIndex: 1,
    backgroundColor: "#BDBDBD",
    position: "relative",
    bottom: 0,
    left: 0,
  },
  vertical: {
    height: "100%",
    width: 0.5,
  },
  horisontal: {
    position: "absolute",
    height: 0.5,
    width: "100%",
  },
  iconWrapper: {
    right: 13,
    width: 30,
    height: 30,
  },
  rowDerection: {
    flexDirection: "row",
  },
});

export default table;
