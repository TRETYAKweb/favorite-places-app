import { StyleSheet, Text, View } from "react-native";

export const Screen = () => {
  return (
    <View style={styles.root}>
      <Text>All places screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
