import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { ArrowRight } from 'react-native-feather';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6 py-12">
        {/* Sección superior con imagen */}
        <View className="items-center">
          <Image
            source={{ uri: 'https://your-image-url.com/welcome-illustration.png' }}
            className="w-64 h-64"
            accessibilityLabel="Ilustración de bienvenida"
          />
        </View>

        {/* Sección central con título y descripción */}
        <View className="items-center">
          <Text className="text-4xl font-bold text-gray-900 text-center mb-4">
            Bienvenido a TuApp
          </Text>
          <Text className="text-xl text-gray-600 text-center mb-8">
            Descubre un mundo de posibilidades con nuestra innovadora plataforma
          </Text>
        </View>

        {/* Sección inferior con botones de acción */}
        <View className="space-y-4">
          <TouchableOpacity 
            className="bg-gray-900 py-4 px-6 rounded-xl flex-row justify-center items-center"
            accessibilityLabel="Comenzar ahora"
          >
            <Text className="text-white font-semibold text-lg mr-2">Comenzar ahora</Text>
            <ArrowRight stroke="white" width={24} height={24} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-100 py-4 px-6 rounded-xl"
            accessibilityLabel="Más información"
          >
            <Text className="text-gray-900 font-semibold text-lg text-center">Más información</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;