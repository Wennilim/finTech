import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { INFO_DATA } from "../../api/info";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
const CATEGORIES = ["Overviews", "News", "Orders", "Transactions"];

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const { name, logo, symbol, description } = INFO_DATA[id];
  return (
    <>
      <Stack.Screen options={{ title: name }} />
      <SectionList
        style={{ marginTop: headerHeight + 50 }}
        contentInsetAdjustmentBehavior="automatic"
        scrollEnabled={true}
        keyExtractor={(item) => item.title}
        sections={[{ title: "Section", data: [1] }]}
        renderSectionHeader={() => {
          return (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingBottom: 8,
                backgroundColor: "#f2f3f5",
                borderBottomColor: "#ebebeb",
              }}
            >
              {CATEGORIES.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveIndex(index)}
                    style={
                      activeIndex === index
                        ? styles.categoriesBtnActive
                        : styles.categoriesBtn
                    }
                  >
                    <Text
                      style={
                        activeIndex === index
                          ? styles.categoryTextActive
                          : styles.categoryText
                      }
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 16,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{symbol}</Text>
                <Image
                  source={{
                    uri: logo,
                  }}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginHorizontal: 16,
                  marginBottom: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    border: "1px solid black",
                    backgroundColor: "black",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="add" size={24} color="white" />
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 2,
                    border: "1px solid gray",
                    backgroundColor: "gray",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    Receive
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ height: 500, backgroundColor: "green" }}></View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginVertical: 16,
                    padding: 16,
                    backgroundColor: "white",
                    borderRadius: 16,
                    gap: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Overview
                  </Text>
                  <Text>{description}</Text>
                </View>
             
            </>
          );
        }}
      ></SectionList>
    </>
  );
};

const styles = StyleSheet.create({
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#989696",
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
});

export default Page;
