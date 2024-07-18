import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";

const SIZE = 24;
const COLOR = "black";

const screens = [
  {
    name: "home",
    title: "Home",
    icon: "registered",
    header: () => <CustomHeader />,
    isHeaderTransparent: true,
  },
  { name: "invest", title: "Invest", icon: "line-chart" },
  {
    name: "transfers",
    title: "Transfers",
    icon: "exchange",
  },
  {
    name: "crypto",
    title: "Crypto",
    icon: "bitcoin",
    header: () => <CustomHeader />,
    isHeaderTransparent: true,
  },
  { name: "lifestyle", title: "Lifestyle", icon: "th" },
];

const renderScreen = ({ name, title, icon, header, isHeaderTransparent }) => (
  <Tabs.Screen
    key={name}
    name={name}
    options={{
      title: title,
      tabBarIcon: () => <FontAwesome name={icon} size={SIZE} color={COLOR} />,
      header: header,
      headerTransparent: isHeaderTransparent,
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
