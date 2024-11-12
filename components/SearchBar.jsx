import React from "react";
import { Pressable, TextInput } from "react-native";
import { Search } from "react-native-feather";

export default function SearchBar() {
  return (
    <Pressable
      className="flex-row items-center justify-between bg-primary-100 rounded-full mx-3 p-2 px-3 shadow"
      onPress={() => this.textInput.focus()}
    >
      <TextInput
        ref={(input) => {
          this.textInput = input;
        }}
        className="flex-1 text-base"
        placeholder="Buscar muestras..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Search color="#666" width={25} height={25} />
    </Pressable>
  );
}
