import React from "react";
import { View, Text, TouchableOpacity, Linking, Easing } from "react-native";
import Swipeable from "react-native-swipeable";
import { FontAwesome5 } from "@expo/vector-icons";

import Avatar from "../Avatar";
import Bardge from "../Bardge";
import Person from "./style";

const PersonConteiner = ({
  item,
  onPress,
  openDeleteModal,
  setIsSwiping,
  onDelete,
  isScrollStart,
}) => {
  const [onRightAction, setOnRightAction] = React.useState(false);
  const [swipeRef, setSwipeRef] = React.useState(null);

  const recenter = () => {
    // * скрыть активный свайп
    const animationFn = swipeRef.props.swipeReleaseAnimationFn;
    const animationConfig = swipeRef.props.swipeReleaseAnimationConfig;

    const { pan } = swipeRef.state;
    swipeRef.setState({
      lastOffset: { x: 0, y: 0 },
      leftActionActivated: false,
      leftButtonsActivated: false,
      leftButtonsOpen: false,
      rightActionActivated: false,
      rightButtonsActivated: false,
      rightButtonsOpen: false,
    });
    pan.flattenOffset();
    animationFn(pan, animationConfig).start();
  };
  const onCall = () => {
    recenter();
    Linking.openURL(`tel:${item.tel}`);
  };
  const swipeReleaseAnimationConfig = {
    toValue: { x: 0, y: 0 },
    duration: 250,
    easing: Easing.elastic(0.5),
    useNativeDriver: false,
  };

  const textBardge = (item) => {
    if (item.percent) return (item.percent * 100).toFixed() + "%";
    if (item.start)
      return item.start.split(" ")[1] + " - " + item.finish.split(" ")[1];
  };
  const textGray = (item) => {
    if (item.master) return "Мастер: " + item.master.name.split(" ")[1];
    return item.tel;
  };
  const rightButtons = [
    <TouchableOpacity
      onPress={onCall}
      style={{
        backgroundColor: "#00c900",
        ...Person.swopeableButtons,
      }}
    >
      <FontAwesome5 name="phone-alt" size={23} color="#fff" />
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={recenter}
      style={{
        backgroundColor: "#ef9a36",
        display: onRightAction ? "none" : "flex",
        ...Person.swopeableButtons,
      }}
    >
      <FontAwesome5 name="pencil-alt" size={23} color="#fff" />
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={recenter}
      style={{
        backgroundColor: "#fe3724",
        display: onRightAction ? "none" : "flex",
        ...Person.swopeableButtons,
      }}
    >
      <FontAwesome5 name="trash-alt" size={23} color="#fff" />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable
      onRef={(ref) => setSwipeRef(ref)}
      onSwipeStart={() => setIsSwiping(true)}
      swipeReleaseAnimationConfig={swipeReleaseAnimationConfig}
      onSwipeRelease={() => setIsSwiping(false)}
      rightButtons={rightButtons}
      rightButtonWidth={80}
      rightActionActivationDistance={240}
      onRightActionActivate={() => setOnRightAction(true)}
      onRightActionDeactivate={() => setOnRightAction(false)}
      onRightActionRelease={onCall}
      onRightActionComplete={recenter}
    >
      <TouchableOpacity style={Person.conteiner} onPress={() => onPress(item)}>
        <View style={{ flexDirection: "row" }}>
          <Avatar fullName={item.client ? item.client.name : item.name} />
          <View style={Person.innerWrapper}>
            <View>
              <Text style={Person.fullName}>
                {item.client ? item.client.name : item.name}
              </Text>
              <Text style={Person.textGray}>{textGray(item)}</Text>
            </View>

            <Bardge>{textBardge(item)}</Bardge>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default PersonConteiner;
