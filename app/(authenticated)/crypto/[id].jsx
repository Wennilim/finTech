import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { INFO_DATA } from "../../api/info";
import { TICKET_LIST } from "../../api/ticket";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns";
import Animated, { useAnimatedProps } from "react-native-reanimated";
const CATEGORIES = ["Overviews", "News", "Orders", "Transactions"];
Animated.addWhitelistedNativeProps({
  text: true,
});
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ToolTip = ({ x, y }) => {
  return <Circle cx={x} cy={y} r={8} color="orange" />;
};

const Page = () => {
  const font = useFont(
    require("../../../assets/fonts/SpaceMono-Regular.ttf"),
    12
  );

  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
  const { name, logo, symbol, description } = INFO_DATA[id];

  useEffect(() => {
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `RM ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString("en-GB")}`,
      defaultValue: "",
    };
  });
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
              <View style={[styles.block, { height: 500 }]}>
                <>
                  {!isActive && (
                    <View>
                      <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                        {TICKET_LIST[
                          TICKET_LIST.length - 1
                        ].price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "MYR",
                        })}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "gray",
                        }}
                      >
                        Today
                      </Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid="transparent"
                        animatedProps={animatedText}
                        style={{ fontWeight: "bold", fontSize: 24 }}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid="transparent"
                        animatedProps={animatedDateText}
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "gray",
                        }}
                      ></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: "gray",
                      formatYLabel: (value) => `RM ${value}`,
                      formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
                    }}
                    data={TICKET_LIST}
                    xKey="timestamp"
                    yKeys={["price"]}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color="blue"
                          strokeWidth={3}
                        />
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                      </>
                    )}
                  </CartesianChart>
                </>
              </View>
              <View style={styles.block}>
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
  block: {
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 16,
    gap: 10,
  },
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
