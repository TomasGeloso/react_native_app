import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/CustomButton'
import CustomAlertModal from '@components/CustomAlertModal'
import authStore from '@context/authStore'

const Profile = () => {
  const { logout } = authStore()

  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false)

  const handlePruebaPress = () => {
    setIsAlertModalVisible(true)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-screen">

          <CustomButton 
            title="Sign Out"
            onPress={logout}
            containerStyles="w-full mt-7"
          />

          <CustomButton
            title="Open Modal"
            onPress={() => handlePruebaPress()}
            containerStyles="w-full mt-7"
          />
           
           <CustomAlertModal
              visible={isAlertModalVisible}
              onCancel={() => setIsAlertModalVisible(false)}
              onConfirm={() => setIsAlertModalVisible(false)}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile