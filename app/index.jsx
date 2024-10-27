import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@constants';
import CustomButton from '@components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ heigh:'100%'}}>
        <View className="w-full justify-center items-center px-4 min-h-[85vh]">
          <Image 
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode='contain' />

          <Image 
          source={images.cards}
          className="w-[300px] h-[200px]"
          resizeMode='contain' 
          />

          <Text className="text-3xl text-secondary-200 font-bold text-center mt-4">Welcome</Text>
          <Image 
          source={images.path}
          className="w-[200px] h-[20px]"
          resizeMode='contain'
          />

          <CustomButton
          title="Continue"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='' style='light' />
    </SafeAreaView>
  );
}
