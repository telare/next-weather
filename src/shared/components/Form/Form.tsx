"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";
type FormProps = {
  schema: ObjectSchema<FieldValues, AnyObject>;
  title: React.ReactElement;
};
export default function Form({ schema, title }: FormProps) {
  type Form = InferType<typeof schema>;
  const methods = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const fields: string[] = Object.keys(schema.fields);
  const { handleSubmit } = methods;
  function submitData(data: Form) {
    console.log(data);
  }
  return (
    <FormProvider {...methods}>
      <form className={styles.main__con} onSubmit={handleSubmit(submitData)}>
        {title}

        {fields.map((field, i) => (
          <FormField
            key={i}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
          />
        ))}

        <Button
          title="Log In"
          func={() => submitData}
          width={50}
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
