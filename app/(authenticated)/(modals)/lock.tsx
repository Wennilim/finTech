import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [lastName, setLastName] = useState(user.lastName);
  const [code, setCode] = useState([]);
  const codeLength = Array(6).fill(0);

  // shaking effect when password is wrong
  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  const OFFSET = 20;
  const TIME = 80;

  const onNumberPress = (number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "111111") {
        router.replace("/(authenticated)/(tabs)/home");
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {lastName}</Text>
      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.codeEmpty,
                {
                  backgroundColor:
                    code[index] !== undefined ? "#000" : "#C8C6C6",
                },
              ]}
            />
          );
        })}
      </Animated.View>
      <View style={styles.numberView}>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text style={styles.text}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onBiometricPress}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={26}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackspace}>
                <Text style={styles.number}>
                  <MaterialCommunityIcons
                    name="backspace-outline"
                    size={26}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.forgetPasscode}>Forgot your passcode?</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 80,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
  forgetPasscode: {
    alignSelf: "center",
    color: "#9E9E9E",
    fontWeight: 500,
    fontSize: 18,
  },
});

export default Page;
