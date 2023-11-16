import * as yup from "yup";

const tooShortMessage = "Минимальная длина - ${min} символов";
const tooLongMessage = "Максимальная длина - ${max} символов";

export interface IFormData {
  title: string;
}

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is a required field")
    .min(3, tooShortMessage)
    .max(30, tooLongMessage),
});
