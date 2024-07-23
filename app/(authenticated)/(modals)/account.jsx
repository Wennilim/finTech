import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);

  const menu = [
    {
      name: "Log out",
      icon: "log-out-outline",
      onPress: () => signOut(),
    },
    {
      name: "Account",
      icon: "person",
      onPress: () => console.log("account"),
    },
    {
      name: "Learn",
      icon: "bulb",
      onPress: () => console.log("learn"),
    },
    {
      name: "Inbox",
      icon: "megaphone",
      onPress: () => console.log("inbox"),
    },
  ];

  const onSaveUser = async () => {
    try {
      await user.update({ firstName: firstName, lastName: lastName });
      setEdit(false);
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user.setProfileImage({ file: base64 });
    }
  };

  return (
    <BlurView
      tint="dark"
      intensity={80}
      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
    >
      {user && (
        <SafeAreaView style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
            {user?.imageUrl && (
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "white",
                }}
              />
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontWeight: 500, fontSize: 26, color: "white" }}>
                  {lastName} {firstName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="pencil"
                    size={20}
                    color="white"
                    style={{ marginLeft: 2 }}
                  />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={[styles.inputField]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={[styles.inputField]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
      <View style={styles.actions}>
        {menu.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.button}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={24} color="white" />
            <Text style={{ color: "white", fontSize: 18 }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  editRow: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  captureBtn: {
    width: 100,
    height: 100,
    marginTop: 50,
    backgroundColor: "#CECDCD",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    width: 140,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  actions: {
    backgroundColor: "rgba(256, 256, 256, 0.1)",
    borderRadius: 16,
    gap: 0,
    margin: 20,
  },
  button: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
});

export default Page;
