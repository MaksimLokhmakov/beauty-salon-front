import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
    height: "auto",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10,
  },
  tableWrapper: {
    backgroundColor: "#f1f3f4",
  },
  needlesTableRight: {
    marginLeft: 5,
  },
  needlesTableLeft: {
    marginRight: 5,
  },
  rowDerection: {
    flexDirection: "row",
  },
  title: { fontSize: 19, marginBottom: 10, marginLeft: 10 },
});

export default style;
