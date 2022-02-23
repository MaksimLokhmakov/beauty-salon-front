import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import searchBar from "./style";

const SearchBar = ({ value, setValue, styleWrapper = {}, styleInput = {} }) => {
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
          style={searchBar.searchInput}
          placeholder="Поиск"
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

export default SearchBar;
