import Toast from "react-native-toast-message";

export const showToast = (
  type: "success" | "error" | "info",
  message: string,
  options: { detail?: string; onPress?: () => void } = {}
) => {
  Toast.show({
    type,
    text1: message,
    text2: options.detail,
    onPress: options.onPress
      ? () => {
          Toast.hide();
          options.onPress?.();
        }
      : undefined,
    position: "top",
    visibilityTime: options.onPress ? 4000 : 2500,
  });
};
