import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapPressEvent,
} from "react-native-maps";
import { useCallback, useLayoutEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "shared/ui";
import { colors, fonts, ScreenName } from "shared/lib";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  AddPlace: {
    latitude: number;
    longitude: number;
  };
};

type PlaceDetailsParam = {
  Map: {
    lat: number;
    lng: number;
  };
};

export const Screen = () => {
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProp<PlaceDetailsParam>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const initialLocation = route.params && {
    latitude: route.params.lat,
    longitude: route.params.lng,
  };

  const [selectedLocation, setSelectedLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : 51.1657,
    longitude: initialLocation ? initialLocation.longitude : 10.4515,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  const pressHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "'You have to pick a location (by tapping on map) first!"
      );
      return;
    }

    navigation.navigate(ScreenName.AddPlace, selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name="bookmark"
          color={colors.black}
          size={24}
          onPress={pressHandler}
        />
      ),
    });
  }, [navigation, pressHandler]);

  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) return;
    const { coordinate } = event.nativeEvent;
    setSelectedLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <MapView
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.roboto700,
    color: colors.black,
    fontSize: 17,
  },
  pressable: {
    opacity: 0.5,
  },
});
