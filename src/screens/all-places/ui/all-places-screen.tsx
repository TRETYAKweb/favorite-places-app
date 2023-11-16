import { StyleSheet, Text, View } from "react-native";
import { PlacesList } from "widgets";

export const Screen = () => {
  return (
    <View style={styles.root}>
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
