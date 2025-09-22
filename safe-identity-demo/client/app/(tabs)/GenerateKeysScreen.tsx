import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Platform,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";

const API_BASE_URL = "http://192.168.1.7:4000"; // Replace with your backend IP

export default function GenerateKeysScreen() {
  const router = useRouter();
  const [keys, setKeys] = useState<{
    publicKey: string;
    privateKey: string;
    symmetricKey: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function updatePublicKeyInBackend(userId: string, publicKey: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-public-key`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, publicKey }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to update public key");
      Alert.alert("Success", "Public key saved on server");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  }

  async function fetchKeys() {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/key/generate-keys`);
      if (!response.ok) throw new Error("Failed to generate keys");
      const data = await response.json();
      setKeys(data);

      // Replace with your authenticated user's ID dynamically
      const userId = "1";

      // Update backend with public key
      await updatePublicKeyInBackend(userId, data.publicKey);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={fetchKeys} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Generating..." : "Generate Keys"}
        </Text>
      </Pressable>

      {loading && <ActivityIndicator size="large" color="#1D3D47" />}

      {keys && (
        <View style={styles.keyContainer}>
          <Text style={styles.label}>Public Key (stored in database):</Text>
          <Text selectable style={styles.keyText}>
            {keys.publicKey}
          </Text>

          <Text style={styles.label}>
            Private Key (copy and save securely):
          </Text>
          <Text selectable style={styles.keyText}>
            {keys.privateKey}
          </Text>

          <Text style={styles.label}>
            Symmetric Key (copy and save securely):
          </Text>
          <Text selectable style={styles.keyText}>
            {keys.symmetricKey}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
    backgroundColor: "#f5f9fc",
  },
  button: {
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  keyContainer: {
    marginTop: 20,
  },
  label: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
    color: "#1D3D47",
  },
  keyText: {
    backgroundColor: "#e1e7eb",
    padding: 12,
    borderRadius: 6,
    fontSize: 14,
    color: "#333",
  },
});
