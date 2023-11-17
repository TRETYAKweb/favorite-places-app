import { Alert, StyleSheet, Text, View } from "react-native";
import { LocationIcon } from "shared/assets/icons";
import { colors, fonts } from "shared/lib";
import { Button } from "shared/ui";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import React from "react";
import MapView from "react-native-maps";

interface ILocationPicker {
  pickedLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setPickedLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
}

export const LocationPicker: React.FC<ILocationPicker> = ({
  pickedLocation,
  setPickedLocation,
}) => {
  const [status, requestPermission] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (status?.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (status?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this!"
      );
      return false;
    }

    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    if (location) {
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log(pickedLocation);
    }
  };

  let locationPreview = (
    <View style={styles.noLocation}>
      <LocationIcon />
      <Text style={styles.text}>No location picked yet</Text>
    </View>
  );

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.map}
        provider="google"
        showsUserLocation
        initialRegion={{
          ...pickedLocation,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      />
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.locationPreview}>{locationPreview}</View>
      <View style={styles.inner}>
        <Button
          style={{ flex: 1 }}
          iconName="location"
          iconColor={colors.white}
          iconSize={21}
          onPress={getCurrentLocation}
        >
          Locate User
        </Button>
        <Button
          style={{ flex: 1 }}
          iconName="map"
          iconColor={colors.white}
          iconSize={21}
          mode="dark"
          onPress={() => {}}
        >
          Pick on map
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 15,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  locationPreview: {
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  text: {
    fontFamily: fonts.roboto700,
    color: colors.gray[400],
    marginLeft: 10,
  },
  noLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
