import { ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "shared/ui";
import { colors } from "shared/lib";
import { IFormData, validationSchema } from "../model";
import { ImagePicker } from "features/place/image-picker";
import { useState } from "react";
import { LocationPicker } from "features/place/location-picker";

export const Form = () => {
  const [pickedImage, setPickedImage] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
  });

  return (
    <ScrollView style={style.root}>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onBlur, onChange } }) => (
          <Input
            label="Title"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={errors.title}
            inputProps={{
              placeholder: "Test",
              placeholderTextColor: colors.gray[400],
            }}
          />
        )}
      />
      <ImagePicker pickedImage={pickedImage} setPickedImage={setPickedImage} />
      <LocationPicker
        pickedLocation={pickedLocation}
        setPickedLocation={setPickedLocation}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 30,
  },
});
