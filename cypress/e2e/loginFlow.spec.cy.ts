/// <reference types="cypress" />

describe('Login flow', () => {
  it('should login in the application', () => {
    cy.visit(Cypress.env('baseUrl') + '/login');

    cy.get('[data-testid="email"]').click().type(Cypress.env('user').login);
    cy.get('[data-testid="password"]')
      .click()
      .type(Cypress.env('user').password);
    cy.get('[data-testid="loginButton"]').click();
    cy.contains('Desconectar').should('be.visible'); // When logged, see the favorite item inside the menu
  });
});
