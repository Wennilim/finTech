import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.roundBtn}>
          <Text style={{ color: "white", fontWeight: 500 }}>SG</Text>
        </TouchableOpacity>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#717171"
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#9E9E9E"
          />
        </View>
        <View style={styles.circle}>
          <Ionicons
            style={styles.searchIcon}
            name="stats-chart"
            size={20}
            color="#717171"
          />
        </View>
        <View style={styles.circle}>
          <Ionicons
            style={styles.searchIcon}
            name="card"
            size={20}
            color="#717171"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    gap: 10,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#717171",
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ebebeb",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#9E9E9E",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ebebeb",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomHeader;
