import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const API_BASE_URL = "http://192.168.1.7:4000"; // Replace with your laptop's IP

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, publicKey: "dummyPublicKey" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Registration failed");
      } else {
        Alert.alert("Success", "Registered successfully! Please login.", [
          { text: "OK", onPress: () => router.push("/login") },
        ]);
      }
    } catch (err) {
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCorrect={false}
        returnKeyType="next"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        textContentType="password"
        returnKeyType="done"
      />
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#1D3D47"
        />
      ) : (
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      )}

      <Text style={styles.link} onPress={() => router.push("/login")}>
        Already have an account? Login
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "#f5f9fc",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccd6dd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1D3D47",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  loading: {
    marginVertical: 16,
  },
  link: {
    fontSize: 16,
    color: "#1D3D47",
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 12,
  },
});
