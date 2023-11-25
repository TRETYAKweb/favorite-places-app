import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingOverlay = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="black" />
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
