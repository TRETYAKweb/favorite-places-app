import React from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { Button } from "shared/ui";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { colors, fonts } from "shared/lib";
import { ImageIcon } from "shared/assets/icons";

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
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this!"
      );
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
      <ImageIcon />
      <Text style={style.text}>No image taken yet</Text>
    </View>
  );

  if (pickedImage)
    imagePreview = <Image style={style.image} source={{ uri: pickedImage }} />;

  return (
    <View style={style.root}>
      <View style={style.imagePreview}>{imagePreview}</View>
      <Button
        iconName="camera"
        iconColor={colors.white}
        iconSize={21}
        onPress={takeImageHandler}
      >
        Take image
      </Button>
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
    color: colors.gray[400],
    marginLeft: 10,
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
