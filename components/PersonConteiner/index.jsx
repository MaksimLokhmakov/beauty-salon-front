import React from "react";
import { View, Text, TouchableOpacity, Linking, Easing } from "react-native";
import Swipeable from "react-native-swipeable";
import { FontAwesome5 } from "@expo/vector-icons";
import recenter from "../../utils/forSwipeable/recenter";
import Avatar from "../Avatar";
import Bardge from "../Bardge";
import Person from "./style";

const PersonConteiner = ({
  item = {},
  onPress,
  setIsSwiping,
  onClose = () => {},
  onOpen = () => {},
}) => {
  const [swipeRef, setSwipeRef] = React.useState(null);

  const handlePress = () => onPress(item);
  const handleOpen = () => onOpen(swipeRef);
  const handleClose = () => onClose;
  const setSwipe = (value) => setIsSwiping(value);
  const setRef = (ref) => setSwipeRef(ref);
  const recenterSwipe = () => recenter(swipeRef);
  const onCall = () => {
    recenter(swipeRef);
    Linking.openURL(`tel:${item.tel}`);
  };

  const percent = item.percent && (item.percent * 100).toFixed() + "%";
  const duration =
    item.start && item.start.split(" ")[1] + " - " + item.finish.split(" ")[1];
  const bardge = percent || duration;
  const masterName = item.master && "Мастер: " + item.master.name.split(" ")[1];
  const secondText = masterName || item.tel;
  const primeryText = item.client ? item.client.name : item.name;

  console.log(onClose);

  const swipeReleaseAnimationConfig = {
    toValue: { x: 0, y: 0 },
    duration: 250,
    easing: Easing.elastic(0.5),
    useNativeDriver: false,
  };
  const rightButtons = [
    !item.client && (
      <TouchableOpacity
        onPress={onCall}
        style={{
          backgroundColor: "#00c900",
          ...Person.swopeableButtons,
        }}
      >
        <FontAwesome5 name="phone-alt" size={23} color="#fff" />
      </TouchableOpacity>
    ),
    <TouchableOpacity
      onPress={recenterSwipe}
      style={{
        backgroundColor: "#ef9a36",
        ...Person.swopeableButtons,
      }}
    >
      <FontAwesome5 name="pencil-alt" size={23} color="#fff" />
    </TouchableOpacity>,
    <TouchableOpacity
      onPress={recenterSwipe}
      style={{
        backgroundColor: "#fe3724",
        ...Person.swopeableButtons,
      }}
    >
      <FontAwesome5 name="trash-alt" size={23} color="#fff" />
    </TouchableOpacity>,
  ];

  return (
    <Swipeable
      onRef={setRef}
      onSwipeStart={setIsSwiping(true)}
      onSwipeRelease={setIsSwiping(false)}
      swipeReleaseAnimationConfig={swipeReleaseAnimationConfig}
      rightButtons={rightButtons}
      rightButtonWidth={80}
      onRightButtonsOpenRelease={handleOpen}
      onRightButtonsCloseRelease={handleClose}
    >
      <TouchableOpacity style={Person.conteiner} onPress={handlePress}>
        <View style={{ flexDirection: "row" }}>
          <Avatar fullName={primeryText} />
          <View style={Person.innerWrapper}>
            <View>
              <Text style={Person.fullName}>{primeryText}</Text>
              <Text style={Person.textGray}>{secondText}</Text>
            </View>

            <Bardge>{bardge}</Bardge>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

function arePropsEqual(prevProps, nextProps) {
  // console.log("prevProps", prevProps);
  // console.log("nextProps", nextProps);
  // console.log(prevProps.item === nextProps.item);
  return prevProps.item === nextProps.item;
}

export default React.memo(PersonConteiner, arePropsEqual);
