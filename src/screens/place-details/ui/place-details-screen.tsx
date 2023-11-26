import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { IPlaceSQLite, colors, fetchPlaceDetails, fonts } from "shared/lib";
import { useHeaderHeight } from "@react-navigation/elements";

import { Ionicons } from "@expo/vector-icons";
import { Button } from "shared/ui";

type IconName = "add" | "add-circle" | "bookmark";

type Param = {
  PlaceDetails: {
    id: string;
  };
};

export const Screen = () => {
  const [fetchedPlace, setFetchedPlace] = useState<IPlaceSQLite>();
  const route = useRoute<RouteProp<Param>>();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerTitle}>{fetchedPlace?.title}</Text>
      ),
    });
  }, [navigation, fetchedPlace]);

  useEffect(() => {
    if (route.params) {
      (async () => {
        const place = await fetchPlaceDetails(route.params.id);
        setFetchedPlace(place);
      })();
    }
  }, [route.params]);

  if (!fetchedPlace) {
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading Data...</Text>
    </View>;
  }

  return (
    <ScrollView style={[styles.root, { marginTop: headerHeight }]}>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.inner}>
        <View style={styles.addressInner}>
          <Ionicons
            style={styles.icon}
            name="location"
            color={colors.primary[500]}
            size={21}
          />
          <Text style={styles.addressTitle}>Address:</Text>
        </View>
        <Text style={styles.address}>{fetchedPlace?.address}</Text>
        <Button
          iconName="map"
          iconSize={24}
          iconColor={colors.white}
          onPress={() => {}}
        >
          View on map
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width: "100%",
    minHeight: 350,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 19,
  },
  headerTitle: {
    fontFamily: fonts.gilroy800,
    fontSize: 21,
    color: colors.black,
  },
  inner: {
    flex: 1,
    padding: 25,
  },
  addressInner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addressTitle: {
    fontFamily: fonts.gilroy800,
    fontSize: 21,
  },
  icon: {
    marginRight: 5,
  },
  address: {
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 20,
    color: colors.gray[500],
    marginBottom: 30,
  },
});
