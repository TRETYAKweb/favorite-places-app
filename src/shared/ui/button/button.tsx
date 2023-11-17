import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../../shared/lib";

type IconName = "add" | "trash" | "camera" | "location" | "map";
type TypeMode = "error" | "flat" | "light" | "dark";

interface ButtonProps {
  children: string;
  onPress: () => void;
  mode?: TypeMode;
  iconName?: IconName;
  iconColor?: string;
  iconSize?: number;
  style?: { flex: number };
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  iconName,
  iconColor,
  iconSize,
  mode,
  style,
}) => {
  const iconNameExists = !!iconName;
  const styleMode = [
    mode === "flat" && styles.flatText,
    mode === "light" && styles.lightText,
    mode === "dark" && styles.darkText,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed ? styles.pressed : null, style]}
    >
      <View
        style={[
          styles.root,
          iconNameExists && styles.containerWithIcon,
          mode && styles[mode],
          style,
        ]}
      >
        {iconNameExists && (
          <Ionicons
            style={styles.icon}
            name={iconName}
            color={iconColor}
            size={iconSize}
          />
        )}
        <Text style={[styles.textBtn, ...styleMode]}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary[500],
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBtn: {
    fontFamily: fonts.roboto700,
    color: colors.white,
  },
  icon: {
    marginRight: 10,
  },
  error: {
    backgroundColor: colors.error[500],
  },
  flat: {
    backgroundColor: "transparent",
  },
  flatText: {
    color: colors.primary[500],
  },
  light: {
    backgroundColor: colors.white,
  },
  lightText: {
    color: colors.primary[500],
  },
  dark: {
    backgroundColor: colors.black,
  },
  darkText: {
    color: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
