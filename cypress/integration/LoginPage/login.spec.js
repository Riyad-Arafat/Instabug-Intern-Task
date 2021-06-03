/// <reference types="cypress" />

context("login scenarios", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  describe("Scenario 1", () => {
    it("Display Error message if Wrong credentials provided", () => {
      cy.get("input[name=email]").type("admin@admin.com");

      cy.get("input[name=password]").type(`passss1A{enter}`);
      cy.get("#login-btn").click();
      cy.get("#alert").should("exist");
    });
  });

  describe("Scenario 2", () => {
    it("Display Error message if Wrong password provided", () => {
      cy.get("input[name=email]").type("mohamed@instabug.com");

      cy.get("input[name=password]").type(`passss1A{enter}`);
      cy.get("#login-btn").click();
      cy.get("#alert").should("exist");
    });
  });

  describe("Scenario 3", () => {
    it("Redirect to the welcome page when login successfully", () => {
      cy.get("input[name=email]").type("mohamed@instabug.com");

      cy.get("input[name=password]").type(`12345678As{enter}`);
      cy.get("#login-btn").click();
      cy.get("#logout-btn").should("exist");
    });
  });

  describe("Scenario 4", () => {
    it("Display E-mail Error message if invalid email provided", () => {
      cy.get("input[name=email]").type("ddd").blur();
      cy.wait(200);
      cy.get("#email-alert").should("exist");
    });
  });
});
