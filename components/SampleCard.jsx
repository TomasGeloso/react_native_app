import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Box, Crop, Thermometer, Calendar, Edit } from "react-native-feather";

export function SampleCard({ sample, className, onEditPress }) {
  if (!sample) {
    return (
      <View className="w-full max-w-lg bg-white rounded-lg shadow-md p-4">
        <Text className="text-center text-gray-500">
          No sample data available
        </Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 bg-white rounded-lg shadow-sm p-2 ${className}`}>
      <View className="flex-row">
        <View className="m-auto"> 
            <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-44 h-44 rounded-lg"
            accessibilityLabel="Sample image"
            />
        </View>
        <View className="flex-1 pl-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl font-csansextrabold text-secondary">M {sample.sample_Number}</Text>
            <View className="flex-row gap-1">
                <View className="bg-gray-200 px-2 py-1 rounded">
                    <Text className="text-xs font-csansmedium">{sample.sample_Type.name}</Text>
                </View>
                <Pressable 
                className="bg-gray-200 p-1 rounded"
                onPress={onEditPress}
                >
                    <Edit width={12} height={12} color="#6B7280" className="m-auto"/>
                </Pressable>
            </View>
          </View>
          <View className="mb-2">
            <View className="space-y-2">
                <View className="flex-row items-center">
                    <Box width={20} height={20} color="#6B7280" />
                    <Text className="ml-2 text-sm font-csansmedium">
                        Material: {sample.material.name}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Crop width={20} height={20} color="#6B7280" />
                    <Text className="ml-2 text-sm font-csansmedium">
                        Dimensions: {sample.dimentions}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Thermometer width={20} height={20} color="#6B7280" />
                    <Text className="ml-2 text-sm font-csansmedium">
                        Test Specimen: {sample.test_Specimen_Type.name}
                    </Text>
                </View>
            </View>
          </View>
            <View className="flex-row items-center mt-auto justify-end">
                <Calendar width={16} height={16} color="#6B7280" />
                <Text className="ml-2 text-xs text-gray-500 font-csansregular">
                    Received: {new Date(sample.date_Received).toLocaleDateString()}
                </Text>
            </View>
        </View>
      </View>
    </View>
  );
}
