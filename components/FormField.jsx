import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium ml-1">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row">
        <TextInput
            className="flex-1 text-white text-base font-psemibold"
            value={value}
            placeholder={placeholder}
            placeholderTextColor='gray-300'
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        /> 

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyehide}
                    className="w-6 h-6" 
                />
            </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField