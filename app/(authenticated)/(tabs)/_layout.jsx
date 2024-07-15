import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const SIZE = 24;
const COLOR = "black";

const screens = [
  { name: "home", title: "Home", icon: "registered" },
  { name: "invest", title: "Invest", icon: "line-chart" },
  { name: "transfers", title: "Transfers", icon: "exchange" },
  { name: "crypto", title: "Crypto", icon: "bitcoin" },
  { name: "lifestyle", title: "Lifestyle", icon: "th" },
];

const renderScreen = ({ name, title, icon }) => (
  <Tabs.Screen
    key={name}
    name={name}
    options={{
      title: title,
      tabBarIcon: () => <FontAwesome name={icon} size={SIZE} color={COLOR} />,
    }}
  />
);

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      {screens.map(renderScreen)}
    </Tabs>
  );
};

export default Layout;
