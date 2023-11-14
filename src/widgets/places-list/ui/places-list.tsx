import { PlaceCard } from "entities";
import React from "react";
import { FlatList } from "react-native";
import { IPlace } from "shared";

interface IListProps {
  places: IPlace[];
}

export const List: React.FC<IListProps> = ({ places }) => {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceCard
          title={item.title}
          address={item.address}
          imgUri={item.imgUri}
        />
      )}
    />
  );
};
