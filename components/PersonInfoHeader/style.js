import { StyleSheet } from "react-native";

const HeaderInfo = StyleSheet.create({
  CardInfoWrapper: {
    zIndex: 10,
    paddingTop: 70,
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "#fff",
    width: "100%",
    height: 180,
    shadowColor: "#b0aeae",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  number: {
    fontSize: 16,
    color: "#8B979F",
    position: "relative",
    left: 20,
  },
  reductIconWrapper: {
    position: "absolute",
    width: 32,
    height: 32,
    right: 20,
    top: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  headerButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 25,
  },
});

export default HeaderInfo;
