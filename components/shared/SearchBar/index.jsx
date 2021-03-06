import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import searchBar from "./style";

const SearchBar = ({
  value,
  setValue,
  styleWrapper = {},
  styleInput = {},
  placeholder = "Поиск",
}) => {
  const onChange = (e) => setValue(e);
  return (
    <View style={[searchBar.searchWrapper, styleWrapper]}>
      <View style={[searchBar.searchRow, styleInput]}>
        <Ionicons
          style={{ marginRight: 5 }}
          name="search"
          size={20}
          color="#8993a0"
        />
        <TextInput
          maxLength={20}
          autoComplete="off"
          style={searchBar.searchInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default React.memo(SearchBar);
