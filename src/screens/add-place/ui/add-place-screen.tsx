import { AddPlaceForm } from "features";
import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ImagePicker, LocationPicker } from "features";
import { IFormData } from "features/place/add-place/model";
import { api } from "shared/api";

export const Screen = () => {
  const [pickedImage, setPickedImage] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const headerHeight = useHeaderHeight();

  const onSubmit = async (data: IFormData) => {
    if (pickedLocation) {
      const address = await api.getAdress(
        pickedLocation?.latitude,
        pickedLocation?.longitude
      );
      typeof address === "string" && setAddress(address);
    }
  };

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <AddPlaceForm
        onSubmit={onSubmit}
        imageSlot={
          <ImagePicker
            pickedImage={pickedImage}
            setPickedImage={setPickedImage}
          />
        }
        locationSlot={
          <LocationPicker
            pickedLocation={pickedLocation}
            setPickedLocation={setPickedLocation}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
});
