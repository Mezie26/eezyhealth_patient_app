import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Install using: yarn add @expo/vector-icons


const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter current password"
          placeholderTextColor="#D1D1D1"
        />
        <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
          <Ionicons name={showCurrentPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter New password"
          placeholderTextColor="#D1D1D1"
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
       </View>
       <Text style={styles.label}>Confirm New Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showConfirmNewPassword}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Enter New password"
          placeholderTextColor="#D1D1D1"
        />
        <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
          <Ionicons name={showConfirmNewPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
       </View>
       <View style={{justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 25
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    lineHeight: 20,
    color: "#171717"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "#D5D5D5",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop:10,
    marginBottom: 20,
    backgroundColor: "#fff", // Ensure a background color
    shadowColor: "#101828", // Use the base color without opacity
    shadowOffset: { width: 0, height: 1 }, // Matches x: 0px, y: 1px
    shadowOpacity: 0.05, // Convert #1018280D (D = ~5% opacity in hex)
    shadowRadius: 2, // Approximate blur radius
    //elevation: 2, // For Android
  },
  input: {
    width: 320,
    height: 40,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter-Regular",
  },
  button: {
    width: 380,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#44CE2D",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter-Medium"
  }
});

export default Security;

