import { Link } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { INFO_DATA } from "../../api/info";
import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView } from "react-native-gesture-handler";
import { LISTINGS_DATA } from "../../api/listings";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const cryptoInfoArray = Object.keys(INFO_DATA).map((key) => INFO_DATA[key]);

  return (
    <SafeAreaView>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingTop: headerHeight - 50 }}
      >
        <Text className="text-2xl font-bold p-4">Latest Crypto</Text>
        <View className="flex rounded-lg mx-4 bg-white">
          {cryptoInfoArray.map((crypto) => (
            <Link key={crypto.id} href={`../crypto/${crypto.id}`} asChild>
              <TouchableOpacity className="flex-row items-center gap-2 p-3">
                <Image
                  source={{ uri: crypto.logo }}
                  style={{ width: 30, height: 30 }}
                />
                <View className="flex-1">
                  <Text className="font-semibold">{crypto.name}</Text>
                  <Text className="text-gray-400">{crypto.symbol}</Text>
                </View>
                <View>
                  <Text>{crypto.price}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;
