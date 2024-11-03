import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Bell, Menu, X, ChevronRight } from 'react-native-feather';

const Bookmarks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Navbar */}
        <View className="bg-white boxShadow-sm">
          <View className="flex-row justify-between items-center px-4 py-4">
            <Text className="text-2xl font-bold">Logo</Text>
            <View className="flex-row items-center">
              <TouchableOpacity className="p-2 rounded-full" accessibilityLabel="Ver notificaciones">
                <Bell stroke="black" width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity 
                className="p-2 ml-2 rounded-full"
                onPress={() => setIsMenuOpen(!isMenuOpen)}
                accessibilityLabel="Abrir menú principal"
              >
                {isMenuOpen ? (
                  <X stroke="black" width={24} height={24} />
                ) : (
                  <Menu stroke="black" width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Contenido principal */}
        <View className="p-4">
          <Text className="text-4xl font-bold mb-8 text-gray-900">Componentes de Estilo Vercel</Text>

          {/* Botones */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold mb-4 text-gray-800">Botones</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="bg-gray-900 px-6 py-3 rounded-md">
                <Text className="text-white font-semibold">Botón Primario</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white px-6 py-3 rounded-md border border-gray-300">
                <Text className="text-gray-900 font-semibold">Botón Secundario</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tarjetas */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold mb-4 text-gray-800">Tarjetas</Text>
            <View className="space-y-4">
              <View className="bg-white p-6 rounded-lg boxShadow-md border border-gray-200">
                <Text className="text-lg font-semibold mb-2 text-gray-900">Tarjeta 1</Text>
                <Text className="text-gray-600 mb-4">Esta es una tarjeta de ejemplo con estilo Vercel.</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-gray-900 font-medium mr-1">Leer más</Text>
                  <ChevronRight stroke="black" width={16} height={16} />
                </TouchableOpacity>
              </View>
              <View className="bg-gray-50 p-6 rounded-lg boxShadow-md border border-gray-200">
                <Text className="text-lg font-semibold mb-2 text-gray-900">Tarjeta 2</Text>
                <Text className="text-gray-600 mb-4">Esta es otra tarjeta con un fondo ligeramente diferente.</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-gray-900 font-medium mr-1">Explorar</Text>
                  <ChevronRight stroke="black" width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Inputs */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold mb-4 text-gray-800">Inputs</Text>
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">Correo Electrónico</Text>
                <TextInput
                  className="w-full px-3 py-2 border border-gray-300 rounded-md boxShadow-sm"
                  placeholder="tu@ejemplo.com"
                  keyboardType="email-address"
                />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">Mensaje</Text>
                <TextInput
                  className="w-full px-3 py-2 border border-gray-300 rounded-md boxShadow-sm"
                  placeholder="Escribe tu mensaje aquí"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Alerta */}
          <View className="mb-8">
            <Text className="text-2xl font-semibold mb-4 text-gray-800">Alerta</Text>
            <View className="flex-row items-center bg-gray-50 border-l-4 border-gray-900 p-4 rounded-r-md">
              <Bell stroke="black" width={20} height={20} />
              <Text className="ml-3 text-sm text-gray-700">
                Esta es una alerta de ejemplo con el estilo de Vercel.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Bookmarks;