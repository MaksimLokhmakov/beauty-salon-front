import { StyleSheet } from "react-native";

const HeaderInfo = StyleSheet.create({
  CardInfoWrapper: {
    zIndex: 10,
    paddingTop: 20,
    marginBottom: 10,
    paddingHorizontal: 25,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    backgroundColor: "#fff",
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  rowDerection: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  nameConteiner: {
    flex: 1,
    marginLeft: 5,
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#BDBDBD",
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
});

export default HeaderInfo;
