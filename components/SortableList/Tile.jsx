import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useBalanceStore } from "../../store/useBalanceStore";
import { SIZE } from "./Config";

const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    padding: 14,
    alignSelf: "center",
  },
});

const Tile = ({ id }) => {
  const { transactions } = useBalanceStore();
  if (id === "spent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ fontWeight: 500, fontSize: 16, color: "#9E9E9E" }}>
          Spent this month
        </Text>
        <Text style={{ fontWeight: 700, fontSize: 26, color: "#5A5A5A" }}>
          RM 1024
        </Text>
      </View>
    );
  }
  if (id === "cashback") {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
        pointerEvents="none"
      >
        <View
          style={{ alignItems: "center", gap: 10, justifyContent: "center" }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#F61A42",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
              5%
            </Text>
          </View>
          <Text style={{ fontWeight: 700, fontSize: 18, color: "#9E9E9E" }}>
            Cashback
          </Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <Text style={{ fontWeight: 500, fontSize: 16, color: "#9E9E9E" }}>
            Recent transactions
          </Text>
          {transactions.length === 0 && (
            <Text style={{ color: "#ebebeb", fontWeight: 700, fontSize: 18 }}>
              No transactions
            </Text>
          )}
          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  paddingVertical: 10,
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#5A5A5A",
                }}
              >
                RM {transactions[transactions.length - 1].amount}
              </Text>
              <Text style={{ fontWeight: 700, fontSize: 16, color: "#9E9E9E" }}>
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ fontWeight: 500, fontSize: 16, color: "#9E9E9E" }}>
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color="orange"
          style={{ alignSelf: "center", marginTop: 20 }}
        />
      </View>
    );
  }
};

export default Tile;
