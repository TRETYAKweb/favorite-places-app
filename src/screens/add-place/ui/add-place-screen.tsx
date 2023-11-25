import { AddPlaceForm } from "features";
import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ImagePicker, LocationPicker } from "features";
import { IFormData } from "features/place/add-place/model";
import { useNavigation } from "@react-navigation/native";
import { openNotificationError } from "shared/ui";
import { Place } from "shared/models";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenName } from "shared/lib";

type Param = {
  AllPlaces: {
    newPlace: {
      title: string;
      imgUri: string;
      address: string;
      location: { lat: number; lng: number };
      id: string;
    };
  };
};

export const Screen = () => {
  const [pickedImage, setPickedImage] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<StackNavigationProp<Param>>();

  const onSubmit = async (data: IFormData) => {
    if (!pickedImage) {
      openNotificationError("Нужна фотка");
      return;
    }
    if (!pickedLocation) {
      openNotificationError("Нужно гео");
      return;
    }
    const place = new Place(data.title, pickedImage, pickedLocation.address, {
      lat: pickedLocation.latitude,
      lng: pickedLocation.longitude,
    });
    console.log(place);
    navigation.navigate(ScreenName.AllPlaces, { newPlace: place });
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
