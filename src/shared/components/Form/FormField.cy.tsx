import React from "react";
import FormField, { FormField as FormFieldType } from "./FormField";
import { FormProvider, useForm } from "react-hook-form";

// 1. it should renders, displays props
// 2. it should be accessible, when error with error span
// 3. it should has text that typed

type DefaultFormType = {
  name: string;
};

function FormFieldTestWrapper({
  defaultProps,
}: {
  defaultProps: FormFieldType;
}) {
  const defaultFormState = {
    defaultValues: {
      name: undefined,
    },
    isSubmitted: false,
    isValid: true,
    errors: {},
  };
  const methods = useForm<DefaultFormType>({
    ...defaultFormState,
    mode: "onBlur",
  });
  return (
    <FormProvider {...methods}>
      <FormField {...defaultProps} />
    </FormProvider>
  );
}
describe("<FormField/>", () => {
  let defaultProps: FormFieldType;
  beforeEach(() => {
    defaultProps = {
      name: "formField",
      placeholder: "Enter value",
      type: "text",
      dataCyPrefix: "test",
    };

    cy.mount(<FormFieldTestWrapper defaultProps={defaultProps} />);
    cy.get(
      `input[data-cy='${defaultProps.dataCyPrefix}-form-${defaultProps.name}-field-input'`
    ).as("testInput");
  });
  it("renders correctly and applies passed props", () => {
    cy.get("@testInput").should("be.visible");
    cy.get("@testInput")
      .should("have.attr", "type", defaultProps.type)
      .and("have.attr", "placeholder", defaultProps.placeholder)
      .and("have.attr", "name", defaultProps.name)
      .and(
        "have.attr",
        "data-cy",
        `${defaultProps.dataCyPrefix}-form-${defaultProps.name}-field-input`
      );
  });
  it("should has text typed into", () => {
    cy.get("@testInput").type("test");
    cy.get("@testInput").should("have.value", "test");
  });
  it("should display error message", () => {
    const errorTestAttrs = {
      span: `[data-cy='${defaultProps.dataCyPrefix}-form-${defaultProps.name}-field-input']`,
      p: `[data-cy='${defaultProps.dataCyPrefix}-form-${defaultProps.name}-field-input-error']`,
    };
    cy.mount(<FormFieldTestWrapper defaultProps={defaultProps} />);
    cy.injectAxe();
    cy.get("@testInput").focus();
    cy.get("@testInput").blur();

    cy.get(`span${errorTestAttrs.span}`).as("errorSpan");
    cy.get("@errorSpan")
      .should("have.attr", "id", "FormField-error")
      .and("be.visibles");

    cy.get("@errorSpan")
      .find(`p${errorTestAttrs.p}`)
      .should("be.visible")
      .and("have.text");

    cy.checkA11y("@testInput");
  });

  context("Should be accessible", () => {
    it("accessible with correct ARIA values", () => {
        cy.injectAxe();
        cy.checkA11y("input");
        cy.get("@testInput")
          .should("have.attr", "aria-invalid", "false")
          .and("not.have.attr", "aria-errormessage")
          .and("not.have.attr", "aria-describedby")
          .and("have.attr", "aria-atomic", "true");
      });
    it("has error state accessibility", () => {});
  });
});
