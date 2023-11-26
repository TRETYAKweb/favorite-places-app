import { StyleSheet, View } from "react-native";
import { PlacesList } from "widgets";
import { useHeaderHeight } from "@react-navigation/elements";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { IPlace } from "shared/models";
import { fetchPlaces } from "shared/lib";

export const Screen = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<IPlace[] | []>([]);
  const isFocused = useIsFocused();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      })();
    }
  }, [isFocused]);

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
