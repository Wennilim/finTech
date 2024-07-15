import { View, Text, GestureResponderEvent } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const RoundBtn = ({ text, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{ alignItems: "center", gap: 10 }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#ebebeb",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={30} color="black" />
      </View>
      <Text style={{ fontWeight: 500, fontSize: 16, color: "#9E9E9E" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;
