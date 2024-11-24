import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import authStore from '@context/authStore'
import { Home, User, Bookmark, Plus } from 'react-native-feather'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1">
      {name === 'Home' && <Home color={color} /> }
      {name === 'Profile' && <User color={color} />}
      {name === 'Bookmark' && <Bookmark color={color} />}
      {name === 'Create' && <Plus color={color} />}
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
        {name}
      </Text>
    </View>
  )}

const TabsLayout = () => {
  
  const { isAuthenticated } = authStore()

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
          icon={"home"}
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
          icon={"profile"}
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
          icon={"bookmark"}
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
          icon={"plus"}
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