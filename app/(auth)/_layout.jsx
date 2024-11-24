import { Stack, Redirect } from 'expo-router'
import authStore from '@context/authStore'

const AuthLayout = () => {
  const { isAuthenticated } = authStore()

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