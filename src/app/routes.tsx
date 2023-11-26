import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import {
  AddPlaceScreen,
  AllPlacesScreen,
  MapScreen,
  PlaceDetailsScreen,
} from "screens";
import { ScreenName, colors, fonts, init } from "shared/lib";
import { IconButton, LoadingOverlay, openNotificationError } from "shared/ui";

const Stack = createNativeStackNavigator();

const StackNavigation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        contentStyle: {
          backgroundColor: colors.bg[300],
        },
        headerTintColor: colors.primary[500],
        headerBackTitleStyle: {
          fontFamily: fonts.roboto700,
        },
      }}
    >
      <Stack.Screen
        name={ScreenName.AllPlaces}
        component={AllPlacesScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>All Places</Text>,
          headerRight: () => (
            <IconButton
              color={colors.primary[500]}
              name="add-circle"
              size={31}
              onPress={() => navigation.navigate("AddPlace" as never)}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.AddPlace}
        component={AddPlaceScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Add Place</Text>,
        }}
      />
      <Stack.Screen
        name={ScreenName.Map}
        component={MapScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Map</Text>,
        }}
      />
      <Stack.Screen
        name={ScreenName.PlaceDetails}
        component={PlaceDetailsScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Place Details</Text>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const Routing: React.FC = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        openNotificationError(error);
      });
  }, []);

  if (!dbInitialized) {
    return <LoadingOverlay />;
  }

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.gilroy800,
    fontSize: 21,
  },
});
