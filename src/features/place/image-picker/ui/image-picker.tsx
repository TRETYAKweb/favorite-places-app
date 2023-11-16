import React from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { Button } from "shared/ui";
import Svg, { Path } from "react-native-svg";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { colors, fonts } from "shared/lib";

interface IImagePickerProps {
  pickedImage: string;
  setPickedImage: React.Dispatch<React.SetStateAction<string>>;
}

export const ImagePicker: React.FC<IImagePickerProps> = ({
  pickedImage,
  setPickedImage,
}) => {
  const [status, requestPermission] = useCameraPermissions();

  const hasCameraPermission = async () => {
    if (status?.status === PermissionStatus.UNDETERMINED) {
      const res = await requestPermission();
      return res.granted;
    }

    if (status?.status === PermissionStatus.DENIED) {
      Alert.alert("Test");
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await hasCameraPermission();

    if (!hasPermission) {
      return;
    }

    const response = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    const dataImage = response.assets?.find((item) => item);
    if (dataImage) setPickedImage(dataImage.uri);
  };

  let imagePreview = (
    <View style={style.noImage}>
      <Svg style={style.svg} width={51} height={41}>
        <Path
          d="M50.37 36.0992C50.37 38.4077 48.4814 40.2967 46.1729 40.2967H4.1971C1.88857 40.2967 0 38.4081 0 36.0992V4.1971C0 1.88857 1.88857 0 4.1971 0H46.1729C48.4814 0 50.37 1.88857 50.37 4.1971V36.0992ZM4.1971 3.3579C3.75128 3.3579 3.35827 3.75238 3.35827 4.19673V36.0988C3.35827 36.5447 3.75164 36.9377 4.1971 36.9377H46.1729C46.6172 36.9377 47.0128 36.5447 47.0128 36.0988V4.19673C47.0128 3.75238 46.6172 3.3579 46.1729 3.3579H4.1971ZM11.7536 16.7899C8.97263 16.7899 6.71506 14.5338 6.71506 11.7536C6.71506 8.97337 8.97263 6.71617 11.7536 6.71617C14.5334 6.71617 16.7888 8.97337 16.7888 11.7536C16.7888 14.5338 14.5338 16.7899 11.7536 16.7899ZM43.6535 33.5809H6.71506V28.5427L15.1107 20.1493L19.3078 24.3453L32.7398 10.9148L43.6535 21.8284V33.5809Z"
          fill={colors.black}
        />
      </Svg>
      <Text style={style.text}>No image taken yet</Text>
    </View>
  );

  if (pickedImage)
    imagePreview = <Image style={style.image} source={{ uri: pickedImage }} />;

  return (
    <View style={style.root}>
      <View style={style.imagePreview}>{imagePreview}</View>
      <Button onPress={takeImageHandler}>Take image</Button>
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    marginTop: 10,
  },
  noImage: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.roboto700,
  },
  svg: {
    marginRight: 15,
  },
  imagePreview: {
    width: "100%",
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
