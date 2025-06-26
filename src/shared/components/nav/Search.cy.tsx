import Search from "./Search";
describe("<Search/>", () => {
  beforeEach(() => {
    cy.mountWithAllProviders(<Search />);
    cy.get("search[data-cy='search']").as("search");
  });
  context("Elements rendering with correct attributes", () => {
    it("search", () => {
      cy.get("@search").should("be.visible");
    });
    it("label", () => {
      cy.get("@search")
        .find("label[data-cy='search-label']")
        .should("be.visible")
        .wait(50)
        .and("have.attr", "htmlFor", "citySearch");
    });
    it("input", () => {
      cy.get("@search")
        .find("input[data-cy='search-input']")
        .should("be.visible")
        .and("have.attr", "id", "citySearch")
        .and("have.attr", "type", "search")
        .and("have.attr", "placeholder", "Search Here...");
    });
    it("shortcut div", () => {
      cy.get("@search")
        .find("div[data-cy='search-shortcut']")
        .should("be.visible")
        .and("have.attr", "id", "searchShortcut")
        .and("have.attr", "title", "Press Command + F to search for a city");
    });
  });
  context("Accessibility", () => {
    it("should be accessible", () => {
      cy.injectAxe();
      cy.checkA11y("search");
    });
    context("should has ARIA attributes", () => {
      it("search", () => {
        cy.get("@search")
          .should("have.attr", "role", "search")
          .and("have.attr", "aria-label", "City search");
      });
      it("input", () => {
        cy.get("@search")
          .find("input[data-cy='search-input']")
          .should("have.attr", "aria-describedby", "searchShortcut");
      });
      it("shortcut div", () => {
        cy.get("@search")
          .find("div[data-cy='search-shortcut']")
          .should(
            "have.attr",
            "aria-label",
            "Search shortcut, press Command + F"
          );
      });
    });
  });
  context("Handling of events", () => {
    it("should handle onCLick event", () => {
      cy.get("@search").get("input").should("not.be.focused");
      cy.get("@search").find("input").click();
      cy.get("input").should("be.focused");
    });
    it("should handle onChange event", () => {
      cy.get("@search").find("input").clear().type("New York");
      cy.get("@search").find("input").should("have.value", "New York");
    });
  });
});
