import { StyleSheet } from "react-native";

const Button = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    backgroundColor: "#F8BBD0",
    borderRadius: 50,
    bottom: 25,
    shadowColor: "#F8BBD0",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});

export default Button;
