import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { EyeOff, Eye } from 'react-native-feather'

const FormField = ({ label, value, placeholder, handleChangeText, otherStyles, multiline, ...props }) => {
  
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base font-csansbold text-gray-700 mb-1">{label}</Text>
      <View className="relative">
        <TextInput
            className={`w-full px-4 py-2 bg-white text-gray-900 border-2 border-gray-300 rounded-xl ${multiline ? 'min-h-28 align-top pt-4' : 'h-14'}`}

            value={value}
            placeholder={placeholder}
            placeholderTextColor={'#d1d5db'}
            onChangeText={handleChangeText}
            secureTextEntry={label === 'Password' && !showPassword}
            multiline={multiline}
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