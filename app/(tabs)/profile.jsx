import { View, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@components/CustomButton'
import DeleteAlert from '@components/DeleteAlert'
import authStore from '@context/authStore'

const Profile = () => {
  const { logout } = authStore()

  const handlePruebaPress = () => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro que deseas eliminar?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Eliminar", 
          onPress: () => onDelete(),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-screen">
          {/* {error && ( // Displays the error message if there is an error
            <Text className="text-red-500 text-center mt-2">
              {error}
            </Text>
          )} */}

          <CustomButton 
            title="Sign Out"
            onPress={logout}
            containerStyles="w-full mt-7"
          />

          <DeleteAlert>

          </DeleteAlert>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile