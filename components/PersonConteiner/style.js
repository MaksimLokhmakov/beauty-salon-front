import { StyleSheet } from "react-native";

const Person = StyleSheet.create({
  conteiner: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  avatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    marginTop: -1,
    fontSize: 20,
    fontWeight: "600",
  },
  fullName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
  },
  textGray: {
    fontSize: 16,
    color: "#8b979f",
  },
});

export default Person;
