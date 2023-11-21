import { StyleSheet, View } from "react-native";
import { PlacesList } from "widgets";
import { useHeaderHeight } from "@react-navigation/elements";

export const Screen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <PlacesList places={[]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
});
