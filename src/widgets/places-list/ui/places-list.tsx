import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PlaceCard } from "entities";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScreenName, fonts } from "shared/lib";
import { IPlace } from "shared/models";

interface IListProps {
  places: IPlace[];
}

type Param = {
  PlaceDetails: {
    id: string;
  };
};

export const List: React.FC<IListProps> = ({ places }) => {
  const navigation = useNavigation<StackNavigationProp<Param>>();

  const pressHandler = (id: string) => {
    navigation.navigate(ScreenName.PlaceDetails, { id });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => (
        <PlaceCard
          onPress={() => pressHandler(item.id)}
          title={item.title}
          address={item.address}
          imgUri={item.imgUri}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontFamily: fonts.gilroy800,
    fontSize: 17,
  },
});
