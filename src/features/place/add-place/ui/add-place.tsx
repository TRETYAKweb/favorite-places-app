import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "shared/ui";
import { colors } from "shared/lib";
import { IFormData, validationSchema } from "../model";

interface IFormProps {
  imageSlot: React.ReactNode;
  locationSlot: React.ReactNode;
  onSubmit: (data: IFormData) => void;
}

export const Form: React.FC<IFormProps> = ({
  imageSlot,
  locationSlot,
  onSubmit,
}) => {
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
      {imageSlot}
      {locationSlot}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20,
  },
});
