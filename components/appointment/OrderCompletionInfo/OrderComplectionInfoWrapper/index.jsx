import React from "react";
import Additional from "../Additional";
import Needls from "../Needles";
import Price from "../Price";

const index = ({
  price,
  setPrice,
  checkedAddons,
  setCheckedAddons,
  currentNeedle,
  setCurrentNeedle,
  isEditable = false,
}) => {
  console.log("ORDERCOMPECTION");

  return (
    <>
      <Price price={price} setPrice={setPrice} isEditable={isEditable} />
      <Needls
        currentNeedle={currentNeedle}
        setCurrentNeedle={setCurrentNeedle}
        isEditable={isEditable}
      />
      <Additional
        checked={checkedAddons}
        setChecked={setCheckedAddons}
        isEditable={isEditable}
      />
    </>
  );
};

export default index;
