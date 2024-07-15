import { View, Text, Button } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import RoundBtn from "../../../components/RoundBtn";

const Page = () => {
  const balance = 1280;
  const onAddMoney = () => {};
  return (
    <ScrollView className="bg-gray-100">
      <View className="m-20 items-center">
        <View className="flex-row items-end justify-center">
          <Text className="text-xl font-bold">RM </Text>
          <Text className="text-4xl font-bold">
            {balance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>

      <View className="flex-row p-5 justify-between">
        <RoundBtn icon="add" text="Add Money" onPress={onAddMoney} />
        <RoundBtn icon="refresh" text="Exchange" />
        <RoundBtn icon="list" text="Details" />
      </View>
    </ScrollView>
  );
};

export default Page;
