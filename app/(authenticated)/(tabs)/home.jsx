import React, { useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RoundBtn from "../../../components/RoundBtn";
import { Ionicons } from "@expo/vector-icons";
import { useBalanceStore } from "../../../store/useBalanceStore";
import WidgetList from "../../../components/SortableList/WidgetList";

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();
  const [open, setOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onAddMoney = () => {
    console.log(
      "add money",
      Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? -1 : 1)
    );
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? -1 : 1),
      date: new Date(),
      title: "Added money",
    });
  };

  const onClearMoney = () => {
    clearTransactions();
  };
  const toggleMore = () => {
    if (open) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true, // 避免了因JavaScript线程阻塞而导致的动画卡顿问题
      }).start();
    }
  };

  const menuItems = [
    {
      label: "Statement",
      icon: "cash",
      onPress: () => console.log("statement"),
    },
    {
      label: "Converter",
      icon: "calculator",
      onPress: () => console.log("converter"),
    },
    {
      label: "Background",
      icon: "image",
      onPress: () => console.log("background"),
    },
    {
      label: "Add new account",
      icon: "person-add",
      onPress: () => console.log("add new account"),
    },
  ];

  const buttons = [
    { icon: "add", text: "Add Money", onPress: onAddMoney },
    { icon: "refresh", text: "Exchange", onPress: onClearMoney },
    { icon: "list", text: "Details" },
    { icon: "ellipsis-horizontal", text: "More", onPress: toggleMore },
  ];
  return (
    <ScrollView className="bg-gray-100">
      <View className="m-20 items-center">
        <View className="flex-row items-end justify-center">
          <Text className="text-xl font-bold">RM </Text>
          <Text className="text-4xl font-bold">
            {balance().toLocaleString("en-US", {
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
        <Animated.View
          className="flex-row mx-5 justify-end absolute z-[999] top-80 right-0 "
          style={{
            opacity: fadeAnim,
          }}
        >
          <View className="flex-col bg-white px-3 w-fit rounded-lg shadow-lg">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  onPress={() => {
                    item.onPress();
                    setOpen(false);
                  }}
                >
                  <View className="flex-row items-center justify-between py-3">
                    <Text className="text-lg font-medium w-60">
                      {item.label}
                    </Text>
                    <Ionicons name={item.icon} size={24} color="black" />
                  </View>
                </TouchableOpacity>

                {index < menuItems.length - 1 && (
                  <View className="w-full h-0.5 bg-gray-100" />
                )}
              </React.Fragment>
            ))}
          </View>
        </Animated.View>
      )}

      <Text className="text-xl font-bold mx-5 mt-5">Transactions</Text>
      <View className=" bg-white m-5 rounded-xl">
        {transactions.length === 0 && (
          <Text className="p-7 text-gray-500">No transactions yet.</Text>
        )}

        {/* 由于 transactions.reverse()
        直接在原数组上进行操作，这会导致它每次调用时都改变数组的顺序。为了保持
        transactions 数组在原状态下不被改变，可以在渲染时创建一个新的反转数组。
        可以使用 slice() 方法创建 transactions
        的一个浅拷贝，然后再进行反转。这样可以避免原数组被修改。 */}

        {transactions
          .slice()
          .reverse()
          .map((transaction) => (
            <View key={transaction.id} className="flex-row items-center">
              <View className="w-10 h-10 m-2 rounded-full bg-gray-200 justify-center items-center">
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={24}
                  color="black"
                />
              </View>
              <View className="flex-1">
                <Text className="text-md font-bold">{transaction.title}</Text>
                <Text className="text-gray-400 text-xs">
                  {transaction.date.toLocaleString()}
                </Text>
              </View>
              <Text
                className={`text-md font-semibold mx-2 ${
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
      </View>
      <Text className="text-xl font-bold mx-5 mt-5 mb-4">Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Page;
