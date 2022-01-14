import { StyleSheet } from "react-native";

const searchBar = StyleSheet.create({
  searchWrapper: {
    paddingTop: 10,
    width: "100%",
    alignItems: "center",
  },
  searchRow: {
    flexDirection: "row",
    backgroundColor: "#ebedf0",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "100%",
    height: 35,
  },
});

export default searchBar;
