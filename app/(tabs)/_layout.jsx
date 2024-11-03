import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@constants'
import useAuthStore from '@context/useAuthStore'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"        
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
        {name}
      </Text>
    </View>
  )}

const TabsLayout = () => {
  
  const { isAuthenticated } = useAuthStore()

  if(!isAuthenticated) {
    return <Redirect href="/sign-in"/>
  }

  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#dfdfdf',
        
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
        },
      }} 
      >
      <Tabs.Screen 
      name="home"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
          <TabIcon 
          icon={icons.home}
          color={color}
          name="Home"
          focused={focused}
          />
        ) 
      }}/>
      <Tabs.Screen 
      name="profile"
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
          <TabIcon 
          icon={icons.profile}
          color={color}
          name="Profile"
          focused={focused}
          />
        ) 
      }}/>
      <Tabs.Screen 
      name="bookmark"
      options={{
        title: 'Bookmark',
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
          <TabIcon 
          icon={icons.bookmark}
          color={color}
          name="Bookmark"
          focused={focused}
          />
        ) 
      }}/>
      <Tabs.Screen 
      name="create"
      options={{
        title: 'Create',
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
          <TabIcon 
          icon={icons.plus}
          color={color}
          name="Create"
          focused={focused}
          />
        ) 
      }}/>
    </Tabs>
    </>
  )
}

export default TabsLayout