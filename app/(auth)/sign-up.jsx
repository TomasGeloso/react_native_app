import { Image, View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@constants'
import FormField from '@components/FormField'
import CustomButton from '@components/CustomButton'
import CustomAlert from '@components/CustomAlert'
import { Link, router } from 'expo-router'
import useAuthStore from '@context/useAuthStore'
import { ValidationError } from 'yup'
import { registerValidationSchema } from '@schemas/login'

const SignUp = () => {
  const { register } = useAuthStore();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await registerValidationSchema.validate(form);
      await register(form.email, form.password, form.username);
      router.replace("/home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data);
      } else if (error instanceof ValidationError) {
        setError(error.message);
      } else {
        console.log(error);
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (form) => {
    if (!form.email || !form.password || !form.username) {
      setError("Please fill in all fields");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (form.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    return true;
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
            Sign Up
          </Text>

          {error ? ( // Displays the error message if there is an error
            <CustomAlert 
              message={error}
            />
          ) : null }

          {loading ? (
            <View className="mt-7">
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <View>
              <FormField
                title="Username"
                value={form.username}
                handleChangeText={(e) => setForm({ ...form, username: e })}
                otherStyles="mt-7"
              />

              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
              />

              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
              />

              <CustomButton
                title="Sign In"
                handlePress={handleSubmit}
                containerStyles="mt-7"
                isLoading={loading}
              />

              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">
                  Have an account already?
                </Text>
                <Link
                  href="/sign-in"
                  className="text-lg font-psemibold text-secondary"
                >
                  Sign In
                </Link>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp