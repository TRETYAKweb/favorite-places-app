import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapPressEvent,
} from "react-native-maps";
import { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "shared/ui";
import { colors, fonts, screenNames } from "shared/lib";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  AddPlace: {
    latitude: number;
    longitude: number;
  };
};

export const Screen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [selectedLocation, setSelectedLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);

  const region = {
    latitude: 51.1657,
    longitude: 10.4515,
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

    navigation.navigate(screenNames.AddPlace, selectedLocation);
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
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
