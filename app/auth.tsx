import { saveRegionToProfile } from "@/api/region";
import { supabase } from "@/lib/supabase";
import { showToast } from "@/lib/toast";
import { useAuth } from "@/providers/auth-provider";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import {
  SignInInput,
  signInSchema,
  SignUpInput,
  signUpSchema,
} from "../lib/auth.schema";

export default function AuthScreen() {
  const { session } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: isSignUp
      ? {
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        },
  });

  // Reset form when switching between sign up and sign in
  useEffect(() => {
    const defaultValues = isSignUp
      ? {
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        };

    reset(defaultValues);
  }, [isSignUp, reset]);

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  const signUp = async (data: SignUpInput) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        showToast(
          "error",
          error.message || "Sign up failed. Please try again."
        );
        console.error("Sign up error:", error);
      } else {
        showToast(
          "success",
          "Account created successfully! Please check your email to verify your account."
        );
        setIsSignUp(false);
      }
    } catch (error) {
      showToast("error", "Sign up failed. Please try again.");
      console.error("Sign up error:", error);
    }
  };

  const signIn = async (data: SignInInput) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        showToast(
          "error",
          error.message || "Sign in failed. Please try again."
        );
        console.error("Sign in error:", error);
      } else {
        saveRegionToProfile();
        showToast("success", "Welcome back!");
      }
    } catch (error) {
      showToast("error", "Sign in failed. Please try again.");
      console.error("Sign in error:", error);
    }
  };

  const onSubmit = (data: any) => {
    if (isSignUp) {
      signUp(data as SignUpInput);
    } else {
      signIn(data as SignInInput);
    }
  };

  const handleModeSwitch = (newMode: boolean) => {
    setIsSignUp(newMode);
    setShowPassword(false);
    setShowConfirmPassword(false);
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
              onPress={() => handleModeSwitch(true)}
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
              onPress={() => handleModeSwitch(false)}
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

            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Enter your email"
                    placeholderTextColor="#B0B8C4"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                      style={styles.passwordInput}
                      value={value}
                      placeholderTextColor="#B0B8C4"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Enter your password"
                    />
                  </>
                )}
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
            {/* Error message below input */}
            <Controller
              control={control}
              name="password"
              render={({ fieldState: { error } }) => (
                <>
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </>
              )}
            />
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextInput
                        style={styles.passwordInput}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Confirm your password"
                        placeholderTextColor="#B0B8C4"
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </>
                  )}
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
              {/* Error message below input */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ fieldState: { error } }) => (
                  <>
                    {error && (
                      <Text style={styles.errorText}>{error.message}</Text>
                    )}
                  </>
                )}
              />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.authButton,
              formState.isSubmitting && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
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
