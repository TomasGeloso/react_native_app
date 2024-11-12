import React from "react";
import { Pressable, Text } from "react-native";

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
  type = "primary",
}) => {
  const getButtonStyles = () => {
    switch (type) {
      case "secondary":
        return {
          pressable: "bg-primary border border-gray-300",
          text: "text-secondary",
        }
      case "primary":
      default:
        return { 
          pressable: "bg-secondary",
          text: "text-white",
        };
    }
  };
  
  const styles = getButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-6 py-3 rounded-xl ${styles.pressable} ${containerStyles} ${
        isLoading ? "bg-opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg text-center ${styles.text} ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
