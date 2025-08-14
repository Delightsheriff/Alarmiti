import { showToast } from "@/lib/toast";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ZodIssue } from "zod";
import { signInWithSupabase, signUpWithSupabase } from "../api/auth";
import { signInSchema, signUpSchema } from "../lib/auth.schema";

export default function AuthScreen() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({});

  const handleAuth = async () => {
    setIsLoading(true);
    setFormErrors({}); // Clear previous errors

    try {
      if (isSignUp) {
        const result = signUpSchema.safeParse({
          email,
          password,
          confirmPassword,
        });
        if (!result.success) {
          // Map Zod issues to fields
          const errors: { [key: string]: string[] } = {};
          result.error.issues.forEach((issue: ZodIssue) => {
            const field = issue.path[0] as string;
            if (!errors[field]) errors[field] = [];
            errors[field].push(issue.message);
          });
          setFormErrors(errors);
          setIsLoading(false);
          return;
        }
        const res = await signUpWithSupabase(email, password);
        if (res.success) {
          showToast("success", "Account created successfully!");
          setIsSignUp(false); // Switch to Sign In tab
          setPassword("");
          setConfirmPassword("");
        } else {
          showToast("error", "Sign up failed. Please try again.");
        }
      } else {
        const result = signInSchema.safeParse({ email, password });
        if (!result.success) {
          const errors: { [key: string]: string[] } = {};
          result.error.issues.forEach((issue: ZodIssue) => {
            const field = issue.path[0] as string;
            if (!errors[field]) errors[field] = [];
            errors[field].push(issue.message);
          });
          setFormErrors(errors);
          setIsLoading(false);
          return;
        }
        const res = await signInWithSupabase(email, password);
        if (res.success) {
          showToast("success", "Welcome back!");
          router.replace("/(tabs)");
        } else {
          showToast("error", "Sign in failed. Please try again.");
        }
      }
    } catch (error) {
      showToast("error", "Authentication failed. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="shield-checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>AlarmIt</Text>
          <Text style={styles.tagline}>
            {isSignUp
              ? "Join your neighborhood watch"
              : "Welcome back to your community"}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isSignUp && styles.toggleButtonActive,
              ]}
              onPress={() => setIsSignUp(true)}
            >
              <Text
                style={[styles.toggleText, isSignUp && styles.toggleTextActive]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isSignUp && styles.toggleButtonActive,
              ]}
              onPress={() => setIsSignUp(false)}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isSignUp && styles.toggleTextActive,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#B0B8C4"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {formErrors.email &&
              formErrors.email.map((msg, idx) => (
                <Text key={idx} style={styles.errorText}>
                  {msg}
                </Text>
              ))}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#B0B8C4"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Ionicons name="eye-off" size={20} color="#B0B8C4" />
                ) : (
                  <Ionicons name="eye" size={20} color="#B0B8C4" />
                )}
              </TouchableOpacity>
            </View>
            {formErrors.password &&
              formErrors.password.map((msg, idx) => (
                <Text key={idx} style={styles.errorText}>
                  {msg}
                </Text>
              ))}
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#B0B8C4"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Ionicons name="eye-off" size={20} color="#B0B8C4" />
                  ) : (
                    <Ionicons name="eye" size={20} color="#B0B8C4" />
                  )}
                </TouchableOpacity>
              </View>
              {formErrors.confirmPassword &&
                formErrors.confirmPassword.map((msg, idx) => (
                  <Text key={idx} style={styles.errorText}>
                    {msg}
                  </Text>
                ))}
            </View>
          )}

          <TouchableOpacity
            style={[styles.authButton, isLoading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#1A2A44" />
            ) : (
              <Text style={styles.authButtonText}>
                {isSignUp ? "Create Account" : "Sign In"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A2A44",
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  appName: {
    fontSize: 36,
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#B0B8C4",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    minHeight: 400,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: "#FFFFFF",
  },
  toggleText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
  },
  toggleTextActive: {
    color: "#1A2A44",
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 52,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minHeight: 52,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#FFFFFF",
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  authButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 56,
    justifyContent: "center",
  },
  authButtonText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#1A2A44",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  forgotPasswordButton: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 12,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "#B0B8C4",
  },
  errorText: {
    color: "#FF4D4F",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Inter-Regular",
  },
});
