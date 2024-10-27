import { View, Text } from 'react-native'
import { Link, Stack } from 'expo-router'

const NotFoundPage = () => {
  return (
    <>
        <Stack.Screen options={{title:"Oops, Not Found Page!"}}></Stack.Screen>
        <View className="w-full bg-primary h-full justify-center items-center">
            <Link href="/" className="text-secondary font-bold text-lg border-2 p-2 rounded border-secondary">Go to index</Link>
        </View>
    </>
  )
}

export default NotFoundPage