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
    color: "#000000",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  fullSectionTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "500",
    width: "100%",
    height: 58,
    backgroundColor: "#fff",
    textAlign: "center",
    paddingTop: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  infoCardWrapper: {
    paddingHorizontal: 25,
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
});

export default Screen;
