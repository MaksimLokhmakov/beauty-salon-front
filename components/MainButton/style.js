import { StyleSheet } from "react-native";

const Button = StyleSheet.create({
  wrapper: {
    width: "auto",
    display: "flex",
    borderRadius: 30,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "#ffffff",
  },
});

export default Button;
