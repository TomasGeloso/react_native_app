import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { EyeOff, Eye } from 'react-native-feather'

const FormField = ({ label, value, placeholder, handleChangeText, otherStyles, multiline, password, ...props }) => {
  
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`${otherStyles}`}>
      <Text className="text-base font-csanssemibold text-secondary-100 mb-1 ml-1">{label}</Text>
      <View className="relative">
        <TextInput
            className={`w-full px-4 py-2 bg-white text-secondary-200 font-csansmedium border-2 border-primary-400 rounded-xl ${multiline ? 'min-h-28 align-top pt-4' : 'h-14'}`}

            value={value}
            placeholder={placeholder}
            placeholderTextColor={'#D1D5DB'}
            onChangeText={handleChangeText}
            secureTextEntry={password && !showPassword}
            multiline={multiline}
            {...props}
        /> 

        {password && (
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