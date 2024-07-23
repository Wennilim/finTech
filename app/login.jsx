import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const { signIn } = useSignIn();

  const onLoginPress = async (type) => {
    switch (type) {
      case "Phone": {
        try {
          const fullPhoneNumber = `+60${phoneNumber}`;

          const response = await signIn.create({
            identifier: fullPhoneNumber,
          });

          const { supportedFirstFactors } = response;

          if (!supportedFirstFactors) {
            throw new Error("No supported first factors found in the response");
          }

          const firstPhoneFactor = supportedFirstFactors.find(
            (factor) => factor.strategy === "phone_code"
          );

          if (!firstPhoneFactor) {
            throw new Error("No phone code factor found");
          }

          const { phoneNumberId } = firstPhoneFactor;

          const params = {
            strategy: "phone_code",
            phoneNumberId,
          };

          await signIn.prepareFirstFactor(params);

          router.push({
            pathname: "/verify/[phone]",
            params: { phone: fullPhoneNumber, signin: true },
          });
        } catch (err) {
          console.log("Error caught:", JSON.stringify(err, null, 2));

          if (isClerkAPIResponseError(err)) {
            const error = err.errors[0];
            Alert.alert("Error", error.message);
            console.log(`Error: ${error.code} - ${error.longMessage}`);
          } else {
            Alert.alert("Error", "An unexpected error occurred");
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View className="flex-1 p-4 bg-white">
        <Text className="text-4xl font-bold">Welcome back</Text>
        <Text className="text-lg my-5 text-gray-500">
          Enter the phone number associated with your account
        </Text>
        <View className="flex-row mt-10 mb-4 w-full gap-1">
          <TextInput
            className="flex bg-gray-200 rounded-xl p-4"
            placeholder="Country code"
            placeholderTextColor={"gray"}
            keyboardType="numeric"
            value={"+60"}
          />
          <TextInput
            className="flex bg-gray-200 rounded-xl p-4 w-[82%]"
            placeholder="Mobile number"
            keyboardType="numeric"
            placeholderTextColor={"gray"}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          className="bg-black rounded-3xl px-7 py-3 mt-4 mb-8 w-full flex justify-center items-center items-content-center"
          onPress={() => onLoginPress("Phone")}
        >
          <Text className="text-white text-lg font-normal">Continue</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-4">
          <View className="h-px flex-1 bg-gray-200" />
          <Text className="text-gray-400 text-regular">or</Text>
          <View className="h-px flex-1 bg-gray-200" />
        </View>
        <TouchableOpacity
          className="bg-white rounded-3xl py-3 mt-8 w-full flex-row border-gray-200 border justify-center items-center items-content-center"
          onPress={onLoginPress("Email")}
        >
          <Ionicons name="mail" size={24} color="black" />
          <Text className="text-black text-md font-bold ml-4">
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-3xl py-3 mt-4 w-full flex-row border-gray-200 border justify-center items-center items-content-center"
          onPress={onLoginPress("Google")}
        >
          <Ionicons name="logo-google" size={24} color="black" />
          <Text className="text-black text-md font-bold ml-4">
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-3xl py-3 mt-4 w-full flex-row border-gray-200 border justify-center items-center items-content-center"
          onPress={onLoginPress("Apple")}
        >
          <Ionicons name="logo-apple" size={24} color="black" />
          <Text className="text-black text-md font-bold ml-4">
            Continue with Apple ID
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
