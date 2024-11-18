import { View, Text } from 'react-native'
import { Stack, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import useAuthStore from '@context/useAuthStore'

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore()

  if(isAuthenticated) {
    console.log('Redirecting to home')
    return <Redirect href="/home"/>
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{ headerShown: false }}
        />
      
        <Stack.Screen
          name='sign-up'
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout