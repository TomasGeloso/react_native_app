import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/CustomButton'
import useAuthStore from '@context/useAuthStore'

const Profile = () => {
  const { logout, error } = useAuthStore()


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-screen">
          {error && ( // Displays the error message if there is an error
            <Text className="text-red-500 text-center mt-2">
              {error}
            </Text>
          )}

          <CustomButton 
            title="Sign Out"
            handlePress={logout}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile