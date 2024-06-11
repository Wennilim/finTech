import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const HomePage = () => {
  const [assets] = useAssets([require("../assets/videos/intro.mp4")]);
  return (
    <View className="flex-1 h-screen w-screen justify-between">
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          className="w-full h-full absolute"
          source={{ uri: assets[0].uri }}
        />
      )}
      <View className="flex gap-4 mt-14 relative h-full w-full">
        <Text className="flex items-center px-4 justify-center text-4xl text-white font-black uppercase">
          Ready to change the way you money?
        </Text>
        <View className="flex-row items-center justify-evenly absolute bottom-20 w-full">
          <TouchableOpacity>
            <Link href={"./login"} asChild>
              <Text className="text-white text-xl font-medium">Log In</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white rounded-3xl px-7 py-3">
            <Link href={"./signUp"} asChild>
              <Text className="text-black text-xl font-medium">Sign Up</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
