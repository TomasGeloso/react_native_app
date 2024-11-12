import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { EyeOff, Eye } from 'react-native-feather'

const FormField = ({ label, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-sm font-medium font-psemibold text-gray-700 mb-1">{label}</Text>
      <View className="relative">
        <TextInput
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 pr-12"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            secureTextEntry={label === 'Password' && !showPassword}
        /> 

        {label === 'Password' && (
            <Pressable
            className="absolute right-3 top-4" 
            onPress={() => setshowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color='gray' width={24} height={24} />
                ):(
                  <Eye color='gray' width={24} height={24} />
                )}
            </Pressable>
        )}

      </View>
    </View>
  )
}

export default FormField