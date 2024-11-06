import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@constants';
import Logo from '@assets/logo.svg';
import Icon from '@assets/icon.svg';
import CustomButton from '@components/CustomButton';

export default function App() {
  return (
      <SafeAreaView className="bg-primary h-full">
          <View className="w-full justify-center items-center px-4 min-h-[85vh]">
            
            <View className="flex-row items-center">
              <Icon />
              <Text className="font-csansbold text-5xl mx-3 text-secondary">samplepath</Text>
            </View>

            <CustomButton
            title="Continue"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
            />
          </View>
        <StatusBar backgroundColor='' style='auto' />
      </SafeAreaView>
  );
}
