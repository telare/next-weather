import React from "react";
import Button, { Button as BtnType } from "./Button";
import { githubIcon } from "@/utils/Icons";

// + Text Rendering: Does the button display its `text` prop correctly?
// - Image Rendering: Does the button render an `Image` component when `image` prop is provided, with correct attributes?
// + Icon Rendering: Does the button render the `icon` JSX element?
// + Click Handler: Does the `func` prop get called when the button is clicked?
// + `aria-label`: Is the `aria-label` set correctly, prioritizing `ariaLabel` over `text`?
// + `data-cy` Attribute: Is the `data-cy` attribute correctly formed?
// - Additional HTML Attributes: Does it pass through standard HTML button attributes (`type`, `disabled`, etc.)?
// + Class Names: Does it apply the `className` prop?
describe("<Button />", () => {
  const defaultProps: BtnType = {
    text: "Default Button",
    dataCyPrefix: "test",
    width: 500,
  };
  beforeEach(() => {
    cy.mount(<Button {...defaultProps} />);
  });
  it("renders", () => {
    cy.get("button").should("be.visible");
  });
  it("displays text from props", () => {
    const buttonTestText: string = "Hi!";
    cy.mount(<Button {...defaultProps} text={buttonTestText} />);
    cy.get("button").should("have.text", buttonTestText);
  });
  it("has testing attribute", () => {
    const testingAttrName: string = "data-cy";
    const testingAttrValue: string = "test-btn";
    cy.get("button").should("have.attr", testingAttrName, testingAttrValue);
  });

  // it("renders image with correct attributes", () => {
  //   cy.mount(
  //     <Button
  //       dataCyPrefix="test"
  //       width={100}
  //       image={{
  //         src: "/img/marker.png",
  //         width: 40,
  //         height: 40,
  //         alt: "marker",
  //       }}
  //     />
  //   );
  //   cy.get("button")
  //     .should("have.attr", "src", "/img/marker.png")
  //     .and("have.attr", "alt", "marker button image");
  // });

  it("renders icon", () => {
    cy.mount(<Button {...defaultProps} icon={githubIcon} />);
    cy.get("button")
      .find("svg[data-cy='icon']")
      .should("exist")
      .and("be.visible");
  });

  it("accessibile  with a passed text as aria-label", () => {
    cy.injectAxe();
    cy.get("button").should("have.attr", "aria-label", defaultProps.text);
    cy.checkA11y("button");
  });
  it("accessibile with a passed aria-label", () => {
    cy.injectAxe();
    cy.mount(<Button {...defaultProps} ariaLabel="passed-label" />);
    cy.get("button").should("have.attr", "aria-label", "passed-label");
    cy.checkA11y("button");
  });

  it("clicking + fires a click event with the passed value", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(<Button {...defaultProps} func={onClickSpy} />);
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.calledOnce");
  });

  it("applies custom className", () => {
    const customClassName: string = "test-classs";
    cy.mount(<Button {...defaultProps} className={customClassName} />);
    cy.get("button").should("have.class", customClassName);
  });
  it("applies standart HTML Attributes", () => {
    const customID: string = "custom-ID";
    cy.mount(
      <Button {...defaultProps} disabled={true} id={customID} type="submit" />
    );

    cy.get("button")
      .should("be.disabled")
      .and("have.attr", "id", customID)
      .and("have.attr", "type", "submit");
  });
});
