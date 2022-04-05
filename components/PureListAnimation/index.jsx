import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const index = ({
  wrapperStyle = {},
  animationStyle = {},
  titleStyle = {},
  secondaryTextStyle = {},
  animation,
  titleText = "",
  secondaryText = "",
}) => {
  const animationRef = React.useRef(null);

  const playAnimation = () => {
    animationRef.current.play();
  };
  const resetAnimation = () => {
    animationRef.current.reset();
  };
  React.useEffect(() => {
    playAnimation();
  }, []);

  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          top: 20,
        },
        wrapperStyle,
      ]}
    >
      <LottieView
        ref={animationRef}
        speed={2}
        // autoPlay={false}
        // loop={false}
        style={[
          {
            width: 180,
            height: 180,
            marginBottom: 10,
          },
          animationStyle,
        ]}
        source={animation}
      />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: "600",
              color: "#6e6e72",
            },
            titleStyle,
          ]}
        >
          {titleText}
        </Text>
        <Text
          style={[
            {
              color: "#6d6d71",
              maxWidth: 320,
              textAlign: "center",
            },
            secondaryTextStyle,
          ]}
        >
          {secondaryText}
        </Text>
      </View>
    </View>
  );
};

export default index;
