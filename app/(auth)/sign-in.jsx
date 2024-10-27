import { Image, View, Text, ScrollView } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@constants'
import FormField from '@components/FormField'
import CustomButton from '@components/CustomButton'
import { Link, router } from 'expo-router'
import api from '@services/api'
import { useAuth } from '@hooks/useAuth'

const SignIn = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)


  const handleSubmit = async () => {
    if (!form.email || !form.password){
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try{
      // Makes a request to the server
      const response = await api.post('/api/Auth/login', form);
      
      // Saves the token in the local storage
      await login(response.data.token);
      // if (response.data.token) {
      //   await AsyncStorage.setItem('UserToken', response.data.token);
      // }
      

      // Redirects the user to the home page
      router.replace('/home');

    } catch (error) {
      if(error.response){
        setError(error.response.data.message || 'Invalid credentials');
      } else if (error.request){
        setError('Network Error. Please try again');
      } else {
        setError('Something went wrong. Please try again');
        console.log(error);
      }
    } finally{
      // Stops the loading spinner
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
            Sign In
          </Text>

          {error && ( // Displays the error message if there is an error
            <Text className="text-red-500 text-center mt-2">
              {error}
            </Text>
          )}

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry // Hides the password
          />

          <CustomButton 
          title="Sign In" 
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
              <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn