import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ICardProps {
  title: string;
  imgUri: string;
  address: string;
}

export const Card: React.FC<ICardProps> = ({ title, address, imgUri }) => {
  return (
    <Pressable>
      <Image source={{ uri: imgUri }} />
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
    </Pressable>
  );
};
