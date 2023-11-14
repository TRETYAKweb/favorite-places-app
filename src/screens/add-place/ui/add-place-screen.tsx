import { StyleSheet, Text, View } from "react-native";
import { fonts } from "shared";

export const Screen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Add place screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.gilroy800,
  },
});
