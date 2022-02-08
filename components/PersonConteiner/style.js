import { StyleSheet } from "react-native";

const Person = StyleSheet.create({
  conteiner: {
    width: "100%",
    zIndex: 1,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56.5,
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
    fontSize: 16,
    fontWeight: "600",
  },
  fullName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
  },
  textGray: {
    paddingBottom: 7,
    fontSize: 14,
    color: "#8b979f",
  },
  iconConteiner: {
    height: 56.5,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "7%",
  },
  innerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  swopeableButtons: {
    height: 56.5,
    paddingLeft: (80 - 23) / 2,
    justifyContent: "center",
  },
});

export default Person;
