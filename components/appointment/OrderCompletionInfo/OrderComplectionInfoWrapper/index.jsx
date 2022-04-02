import { View, Text } from "react-native";
import React from "react";
import Additional from "../Additional";
import Needls from "../Needles";
import Price from "../Price";

const index = ({ data, isEditable = false }) => {
  console.log("ORDERCOMPECTION");
  console.log(data);

  return (
    <>
      <Price value={data.price} isEditable={isEditable} />
      <Needls needle={data.needle} isEditable={isEditable} />
      <Additional addons={data.addons} isEditable={isEditable} />
    </>
  );
};

export default index;
