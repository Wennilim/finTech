import { Link, Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

const InitialLayout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signUp"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerStyle: { color: "white" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
          headerStyle: { color: "white" },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"./help"} asChild>
              <TouchableOpacity>
                <Ionicons name="help-circle-outline" size={30} color="black" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "Help",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <InitialLayout />
    </GestureHandlerRootView>
  );
};
export default RootLayoutNav;
