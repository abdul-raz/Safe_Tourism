import React from "react";
import { Platform, StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safe Tourism</Text>
      <Text style={styles.subtitle}>
        Secure and private identity and document management for your travels
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push("/login")}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        &copy; Safe Tourism 2025 - All Rights Reserved
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf1f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1D3D47",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: "#556F7A",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 24,
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#1D3D47",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#1D3D47",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  loginButtonText: {
    color: "#1D3D47",
  },
  footer: {
    marginTop: 50,
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
});
