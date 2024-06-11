import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-4xl font-bold">Let's get started!</Text>
      <Text className="text-lg my-5 text-gray-500">
        Enter your phone number. We will send you a confirmation code there
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
      <Link href="./login" replace asChild>
        <TouchableOpacity>
          <Text className="text-blue-500 text-md font-medium">
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </Link>
      {/* <TouchableOpacity className="bg-black rounded-3xl px-7 py-3">
        <Text className="text-white text-xl font-medium">Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
}
