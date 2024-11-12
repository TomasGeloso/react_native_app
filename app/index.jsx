import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@assets/icon.svg';
import CustomButton from '@components/CustomButton';

export default function App() {
  return (
      <SafeAreaView className="bg-primary h-full">
          <StatusBar backgroundColor='transparent' style='auto' translucent={true} />
          <View className="w-full justify-center items-center px-4 min-h-[85vh]">
            
            <View className="flex-row items-center m-10">
              <Icon />
              <Text className="font-csansbold text-5xl mx-3 text-secondary">samplepath</Text>
            </View>

            <CustomButton
            title="Continue"
            onPress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7 max-w-[400px]"
            />
          </View>
      </SafeAreaView>
  );
}
