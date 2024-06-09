import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";

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
      <View className="flex gap-4 px-3 mt-9">
        <Text className="flex items-center justify-center text-4xl text-white font-black uppercase">
          Ready to change the way you money?
        </Text>
        <View className="flex items-center justify-center gap-2">
          <Link className="" href={"./login"} asChild>
            <TouchableOpacity>
              <Text className="text-white text-xl font-bold">Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default HomePage;
