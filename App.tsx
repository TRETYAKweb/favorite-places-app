import { StyleSheet } from "react-native";
import { App } from "./src/app/app";
import React from "react";

export default function Bootstrap() {
  return <App />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
