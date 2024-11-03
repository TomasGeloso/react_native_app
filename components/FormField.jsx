import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ label, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      <View className="relative">
        <TextInput
            className="w-full px-4 py-3"
            value={value}
            placeholder={placeholder}
            placeholderTextColor='gray-300'
            onChangeText={handleChangeText}
            secureTextEntry={label === 'Password' && !showPassword}
        /> 

        {label === 'Password' && (
            <Pressable onPress={() => setshowPassword(!showPassword)}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyehide}
                    className="w-6 h-6" 
                />
            </Pressable>
        )}

      </View>
    </View>
  )
}

export default FormField