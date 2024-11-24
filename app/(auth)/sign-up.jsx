import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@assets/logo.svg";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";
import CustomAlert from "@components/CustomAlert";
import useAuth from "@hooks/useAuth";
import { ValidationError } from "yup";
import { registerValidationSchema } from "@schemas/login";

const SignUp = () => {
  const { register } = useAuth();

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

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="relative top-4 left-4">
          <Logo />
        </View>

        <View className="w-full justify-center min-h-[80vh] px-5">
          <Text className="text-3xl text-secondary text-semibold font-psemibold mb-3">
            Sign Up
          </Text>

          {error ? ( // Displays the error message if there is an error
            <CustomAlert message={error} />
          ) : null}

          {loading ? (
            <View className="mt-7">
              <ActivityIndicator size="large" color="#111827" />
            </View>
          ) : (
            <View>
              <FormField
                label="Username"
                placeholder="Ej: John Doe"
                value={form.username}
                handleChangeText={(e) => setForm({ ...form, username: e })}
                otherStyles="mt-2"
              />

              <FormField
                label="Email"
                placeholder="Ej: juan@example.com"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-2"
                keyboardType="email-address"
              />

              <FormField
                label="Password"
                placeholder="********"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-2"
                password
              />

              <CustomButton
                title="Sign In"
                onPress={handleSubmit}
                containerStyles="mt-7"
                isLoading={loading}
              />

              <View className="justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-400 font-pregular">
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

export default SignUp;
