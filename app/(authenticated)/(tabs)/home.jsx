import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoundBtn from "../../../components/RoundBtn";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const balance = 1280;
  const [open, setOpen] = useState(false);
  const onAddMoney = () => {};
  const toggleMore = () => {
    console.log("toggle more");
    setOpen((prev) => !prev);
  };

  const menuItems = [
    { label: "Statement", icon: "cash" },
    { label: "Converter", icon: "calculator" },
    { label: "Background", icon: "image" },
    { label: "Add new account", icon: "person-add" },
  ];

  const buttons = [
    { icon: "add", text: "Add Money", onPress: onAddMoney },
    { icon: "refresh", text: "Exchange" },
    { icon: "list", text: "Details" },
    { icon: "ellipsis-horizontal", text: "More", onPress: toggleMore },
  ];
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
        {buttons.map((btn, index) => (
          <RoundBtn
            key={index}
            icon={btn.icon}
            text={btn.text}
            onPress={btn.onPress}
          />
        ))}
      </View>
      {open && (
        <View className="flex-row mx-5 justify-end">
          <View className="flex-col bg-white px-3 w-fit rounded-lg shadow-lg">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <View className="flex-row items-center justify-between py-3">
                  <Text className="text-lg font-medium w-60">{item.label}</Text>
                  <Ionicons name={item.icon} size={24} color="black" />
                </View>
                {index < menuItems.length - 1 && (
                  <View className="w-full h-0.5 bg-gray-100" />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Page;
