import React from "react";
import { Pressable, Text } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-gray-900 px-6 py-3 rounded-xl ${containerStyles} ${
        isLoading ? "bg-opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg text-center ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
