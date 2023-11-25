import { Alert, StyleSheet, Text, View } from "react-native";
import { LocationIcon } from "shared/assets/icons";
import { colors, fonts } from "shared/lib";
import { Button } from "shared/ui";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { RouteProp } from "@react-navigation/native";
import {
  useNavigation,
  useIsFocused,
  useRoute,
} from "@react-navigation/native";
import { api } from "shared/api";

interface ILocationPicker {
  pickedLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setPickedLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
      address: string;
    } | null>
  >;
}

type RootStackParamList = {
  AddPlace: {
    latitude: number;
    longitude: number;
  };
};

export const LocationPicker: React.FC<ILocationPicker> = ({
  pickedLocation,
  setPickedLocation,
}) => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [status, requestPermission] = useForegroundPermissions();
  const mapRef = useRef<MapView | null>(null);

  const setLocationWithAddress = async (
    latitude: number,
    longitude: number
  ) => {
    const address = await api.getAdress(latitude, longitude);
    if (typeof address === "string")
      setPickedLocation({
        latitude: latitude,
        longitude: longitude,
        address: address,
      });
  };

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
    if (location)
      setLocationWithAddress(
        location.coords.latitude,
        location.coords.longitude
      );
  };

  let locationPreview = (
    <View style={styles.noLocation}>
      <LocationIcon />
      <Text style={styles.text}>No location picked yet</Text>
    </View>
  );

  const isMapReadyRef = useRef(true);

  useEffect(() => {
    if (isFocused) {
      isMapReadyRef.current = true;
      return;
    }
    isMapReadyRef.current = false;
  }, [isFocused, isMapReadyRef.current]);

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.map}
        ref={mapRef}
        provider="google"
        onMapLoaded={() => {
          if (isMapReadyRef.current) {
            mapRef.current?.animateCamera({
              center: {
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,
              },
              zoom: 10,
              heading: 0,
              pitch: 0,
              altitude: 0,
            });
          }
        }}
        region={{
          latitude: pickedLocation.latitude,
          longitude: pickedLocation.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        <Marker coordinate={pickedLocation} key={Date.now()} />
      </MapView>
    );
  }

  useEffect(() => {
    if (route.params && isFocused)
      setLocationWithAddress(route.params.latitude, route.params.longitude);
  }, [route.params, isFocused]);

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
          onPress={() => navigate.navigate("Map" as never)}
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
    marginBottom: 20,
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
