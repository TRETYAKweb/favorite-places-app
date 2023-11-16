import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { AddPlaceScreen, AllPlacesScreen } from "screens";
import { colors, fonts } from "shared/lib";
import { IconButton } from "shared/ui";

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
      }}
    >
      <Stack.Screen
        name="AllPlaces"
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
        name="AddPlace"
        component={AddPlaceScreen}
        options={{
          headerBackTitleStyle: {
            fontFamily: fonts.roboto700,
          },
          headerTitle: () => <Text style={styles.headerTitle}>Add Place</Text>,
          headerTintColor: colors.primary[500],
        }}
      />
    </Stack.Navigator>
  );
};

export const Routing: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.gilroy800,
    fontSize: 17,
  },
});
