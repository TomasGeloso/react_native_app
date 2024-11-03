import React from "react";
import { Text, View } from "react-native";
import { Bell } from "react-native-feather";

const CustomAlert = ({ message, containerStyles, textStyles }) => {
  return (
    <View className={`flex-row items-center bg-gray-50 border-l-4 border-gray-900 p-4 rounded-r-md ${containerStyles}`}>
      <Bell stroke="black" width={20} height={20} />
      <Text className={`ml-3 text-sm text-gray-700 ${textStyles}`}>{message}</Text>
    </View>
  );
};

export default CustomAlert;