import { StyleSheet, View } from "react-native";
import { PlacesList } from "widgets";
import { useHeaderHeight } from "@react-navigation/elements";
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IPlace } from "shared/models";

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
  const [loadedPlaces, setLoadedPlaces] = useState<IPlace[] | []>([]);
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<Param>>();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (route.params) {
      setLoadedPlaces((prev) => [...prev, route.params.newPlace]);
    }
  }, [route.params, isFocused]);

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <PlacesList places={loadedPlaces} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 25,
  },
});
