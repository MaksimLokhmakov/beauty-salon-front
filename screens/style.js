import { StyleSheet } from "react-native";

const Screen = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appointmentsWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFD",
  },
  apoointmentsConteiner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  sectionTitle: {
    color: "#212121",
    fontSize: 22,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default Screen;
