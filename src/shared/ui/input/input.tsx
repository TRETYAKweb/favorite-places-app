import React from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { FieldError, Noop } from "react-hook-form";
import { colors, fonts } from "shared/lib";

type TypeMode = "light";

interface InputProps {
  label: string;
  error?: FieldError | undefined;
  inputProps?: TextInputProps;
  mode?: TypeMode;
  onBlur: Noop;
  value: string;
  onChange: (text: string) => void;
  style?: { flex: number };
}

export const Input: React.FC<InputProps> = ({
  label,
  onBlur,
  onChange,
  value,
  error,
  inputProps,
}) => {
  const lableStyle = [styles.lable, error && styles.errorLable];
  const inputStyle = [
    styles.input,
    inputProps?.multiline && styles.multiline,
    error && styles.errorInput,
  ];

  return (
    <View style={styles.root}>
      <Text style={lableStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        {...inputProps}
      />
      {error && <Text style={styles.textError}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 7.5,
  },
  lable: {
    fontFamily: fonts.roboto700,
    fontSize: 16,
    color: colors.black,
    marginBottom: 7,
  },
  errorLable: {
    color: colors.error[500],
  },
  input: {
    fontFamily: fonts.roboto400,
    fontSize: 16,
    padding: 15,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: colors.error[500],
  },
  textError: {
    fontFamily: fonts.roboto400,
    fontSize: 12,
    color: colors.error[500],
    marginTop: 5,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
