import { useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import Logo from '@assets/logo.svg'
import FormField from '@components/FormField'
import CustomButton from '@components/CustomButton'
import CustomAlert from '@components/CustomAlert'
import useAuthStore from '@context/useAuthStore'
import { loginValidationSchema } from '@schemas/login'
import { ValidationError } from 'yup'

const SignIn = () => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await loginValidationSchema.validate(form);

      await login(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      if(error.response && error.response.status === 401) {
        setError(error.response.data);
      } else if(error instanceof ValidationError) {
        setError(error.message);
      } else{
        console.log(error);
        setError("An error occurred. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Logo className="relative top-10 left-4" />

        <View className="w-full justify-center min-h-[70vh] px-4 my-6">

          <Text className="text-2xl text-secondary text-semibold font-psemibold mt-10 mb-2">
            Sign In
          </Text>

          {error ? ( // Displays the error message if there is an error
            <CustomAlert 
              message={error}
            /> 
          ) : null }

          {loading ? ( // Displays the loading spinner if the loading state is true
            <View className="mt-7">
              <ActivityIndicator size="large" color="#111827" />
            </View>
          ) : (
            <View>
              <FormField
                label="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                placeholder="juan@example.com"
                otherStyles="mt-7"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <FormField
                label="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                placeholder="********"
                otherStyles="mt-7"
                secureTextEntry // Hides the password
              />

              <CustomButton
                title="Sign In"
                handlePress={handleSubmit}
                containerStyles="mt-7"
                isLoading={loading}
              />

              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-400 font-pregular">
                  Don't have account?
                </Text>
                <Link
                  href="/sign-up"
                  className="text-lg font-psemibold text-secondary"
                >
                  Sign Up
                </Link>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn