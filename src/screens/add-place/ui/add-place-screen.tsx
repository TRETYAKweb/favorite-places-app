import { AddPlaceForm } from "features";
import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

export const Screen = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <AddPlaceForm />
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
