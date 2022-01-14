export default (letter) => {
  const charCode = letter.charCodeAt();
  if (charCode >= 1040 && charCode <= 1042) {
    return {
      background: "#fef1f0",
      color: "#fe9f00",
    };
  }
  if (charCode >= 1043 && charCode <= 1045) {
    return {
      background: "#ffeef0",
      color: "#fe3347",
    };
  }
  if (charCode >= 1046 && charCode <= 1048) {
    return {
      background: "#f0f5fc",
      color: "#3f8adf",
    };
  }
  if (charCode >= 1049 && charCode <= 1051) {
    return {
      background: "#fef7eb",
      color: "#fe9f00",
    };
  }
  if (charCode >= 1052 && charCode <= 1054) {
    return {
      background: "#f0f8f0",
      color: "#4cb24b",
    };
  }
  if (charCode >= 1055 && charCode <= 1057) {
    return {
      background: "#f4eefa",
      color: "#792ec0",
    };
  }
  if (charCode >= 1058 && charCode <= 1060) {
    return {
      background: "#fef7eb",
      color: "#fec008",
    };
  }
  if (charCode >= 1061 && charCode <= 1063) {
    return {
      background: "#fcf0f4",
      color: "#e5457a",
    };
  }
  if (charCode >= 1064 && charCode <= 1066) {
    return {
      background: "#ffeef0",
      color: "#fe3347",
    };
  }
  if (charCode >= 1067 && charCode <= 1071) {
    return {
      background: "#f1f9f9",
      color: "#62b9ba",
    };
  }
  return {
    background: "#E9F5FF",
    color: "#f578ac",
  };
};
