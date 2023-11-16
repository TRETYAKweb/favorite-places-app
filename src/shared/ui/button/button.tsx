import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fonts } from "../../../shared/lib";

type IconName = "add" | "trash";
type TypeMode = "error" | "flat" | "light";

interface ButtonProps {
  children: string;
  onPress: () => void;
  mode?: TypeMode;
  iconName?: IconName;
  iconColor?: string;
  iconSize?: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  iconName,
  iconColor,
  iconSize,
  mode,
}) => {
  const iconNameExists = !!iconName;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed ? styles.pressed : null]}
    >
      <View
        style={[
          styles.root,
          iconNameExists && styles.containerWithIcon,
          mode && styles[mode],
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
        <Text
          style={[
            styles.textBtn,
            mode === "flat" && styles.flatText,
            mode === "light" && styles.lightText,
          ]}
        >
          {children}
        </Text>
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
    minWidth: 175,
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
  pressed: {
    opacity: 0.7,
  },
});
