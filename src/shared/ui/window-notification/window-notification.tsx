import Toast from "react-native-toast-message";

export const openNotificationSuccess = (description: string): void => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: description,
    visibilityTime: 3000,
    autoHide: true,
    position: "top",
    topOffset: 80,
  });
};

export const openNotificationError = (description: string): void => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: description,
    visibilityTime: 4000,
    autoHide: true,
    position: "top",
    topOffset: 80,
  });
};
