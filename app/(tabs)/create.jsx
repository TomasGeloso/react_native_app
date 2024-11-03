import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Eye, EyeOff } from 'react-native-feather';

const Create = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-12">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-gray-900 mb-2">Crear cuenta</Text>
          <Text className="text-lg text-gray-600">Regístrate para empezar</Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Nombre completo</Text>
            <TextInput
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900"
              placeholder="John Doe"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Correo electrónico</Text>
            <TextInput
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900"
              placeholder="tu@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Contraseña</Text>
            <View className="relative">
              <TextInput
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 pr-12"
                placeholder="********"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                className="absolute right-3 top-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff stroke="gray" width={24} height={24} />
                ) : (
                  <Eye stroke="gray" width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</Text>
            <View className="relative">
              <TextInput
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 pr-12"
                placeholder="********"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                className="absolute right-3 top-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff stroke="gray" width={24} height={24} />
                ) : (
                  <Eye stroke="gray" width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity className="w-full bg-gray-900 py-3 rounded-xl">
            <Text className="text-white text-center font-semibold text-lg">Registrarse</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">¿Ya tienes una cuenta? </Text>
            <TouchableOpacity>
              <Text className="text-gray-900 font-semibold">Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Create;