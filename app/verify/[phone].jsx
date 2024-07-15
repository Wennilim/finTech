import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import { Link, useLocalSearchParams } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { TouchableOpacity } from "react-native-gesture-handler";
const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: phone, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const verifyCode = async () => {
    try {
      await signUp.attemptPhoneNumberVerification({ code });
      await setActive({ session: signUp.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };
  const verifySignIn = async () => {
    try {
      await signIn.attemptFirstFactor({ code });
      await setActive({ session: signIn.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      if (signin) {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  return (
    <View className="p-4 bg-white h-screen">
      <Text className="text-4xl font-bold">6-digit code</Text>
      <Text className="text-lg my-3 text-gray-500">
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={{ marginTop: 10, marginBottom: 20 }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              className={`w-12 h-16 rounded-lg border bg-gray-300 border-gray-300 text-center items-center justify-center`}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text className="text-4xl text-black">
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View
                key={`separator-${index}`}
                className="h-1 w-2.5 bg-gray-500 self-center"
              />
            ) : null}
          </Fragment>
        )}
      />

      <Link href="./login" replace asChild>
        <TouchableOpacity>
          <Text className="text-blue-500 text-md font-medium">
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;
