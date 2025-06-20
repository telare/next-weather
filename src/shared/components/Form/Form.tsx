"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "@shared/styles/Form.module.scss";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { AnyObject, InferType, ObjectSchema } from "yup";
import FormField from "./FormField";
import Button from "../btns/Button";

export type FormProps = {
  schema: ObjectSchema<FieldValues, AnyObject>;
  onSubmit: (data: FieldValues) => Promise<void>;

  title: React.ReactElement;
  dataCyPrefix: string;
  formLinks?: React.ReactNode;
};
export default function Form({
  schema,
  title,
  dataCyPrefix,
  formLinks,
  onSubmit,
}: FormProps) {
  type Form = InferType<typeof schema>;
  const methods = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  const fields: string[] = Object.keys(schema.fields);

  const dataCyConfig = {
    form: `${dataCyPrefix}-form`,
    header: `${dataCyPrefix}-form-header`,
  };
  return (
    <form
      className={styles.formCon}
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="form-header"
      data-cy={dataCyConfig.form}
    >
      <header id="form-header" data-cy={dataCyConfig.header}>
        {title}
      </header>
      <div className={styles.formFieldsCon}>
        <FormProvider {...methods}>
          {fields.map((field, i) => (
            <FormField
              dataCyPrefix={dataCyPrefix}
              key={i}
              name={field}
              type={field === "password" ? "password" : "text"}
              placeholder={field}
            />
          ))}
        </FormProvider>
      </div>
      <div className={styles.formFooter}>
        <Button
          text="Continue"
          dataCyPrefix={dataCyPrefix}
          width={50}
          type="submit"
          className={styles.submitBtn}
        />
        {!!formLinks && (
          <div className={styles.navigationLinks}>{formLinks}</div>
        )}
      </div>
    </form>
  );
}
