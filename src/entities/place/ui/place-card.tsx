import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "shared/lib";

interface ICardProps {
  title: string;
  imgUri: string;
  address: string;
  onPress: () => void;
}

export const Card: React.FC<ICardProps> = ({
  title,
  address,
  imgUri,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: imgUri }} />
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginVertical: 7.5,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 100,
  },
  inner: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontFamily: fonts.gilroy800,
    fontSize: 16,
    marginBottom: 7,
  },
  address: {
    fontFamily: fonts.roboto400,
    fontSize: 14,
    lineHeight: 17,
  },
  pressed: {
    opacity: 0.7,
  },
});
