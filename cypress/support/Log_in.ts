/// <reference types="cypress-if" />
declare namespace Cypress {
    interface Chainable {
      logIn(): Chainable<null>;
    }
  }
  const GEN_EMAIL = `${Math.random().toString(36).substring(7)}@gmail.com`;
  const GEN_PASSWORD = "password";
  const TEAM_NAME = `Team ${Math.random().toString(36).substring(7)}`;
  console.log("GEN_EMAIL :: ", GEN_EMAIL);
  console.log("GEN_PASSWORD :: ", GEN_PASSWORD);
  const TEST_EMAIL = "tac7s@gmail.com";
  const TEST_PASSWORD = "password";
  
  const logout = () => {
    cy.get("div.profile").click();
    cy.get(".logout").should("have.text", "ออกจากระบบ").click();
  };
  
  const login = (username?: string, password?: string) => {
    cy.get("#email-input").type(username || TEST_EMAIL);
    cy.wait(1000);
    cy.get("#password-input").type(password || TEST_PASSWORD);
    cy.get("#login-button").click();
    cy.wait(1000);
    cy.get("#start-tutorial-button")
      .if("visible")
      .then(($el) => {
        $el.click();
        cy.get("#team-name-input").type(TEAM_NAME);
        cy.get("#create-team-button").click();
        cy.get("#skip-button").click();
        cy.get("#initial-complete-button").click();
      })
      .else()
      .then(() => {
        cy.get(".team-box").each((el, index) => {
          if (index === 0) {
            cy.wrap(el).click();
          }
        });
      });
  };
  
  const register = () => {
    cy.get("#link-to-register").should("be.visible").click();
    cy.fixture("face.jpeg", null).as("exampleImage");
    cy.get('.camera-upload-background > input[type="file"]').selectFile(
      "@exampleImage"
    );
    cy.intercept("POST", "/storage/chat-inbox/image/*").as("uploadImage");
    cy.wait("@uploadImage").its("response.statusCode").should("eq", 200);
    cy.get("#firstname-input").type("FirstName");
    cy.get("#lastname-input").type("LastName");
    cy.get("#tel-input").type("0988888888");
    cy.get("#email-input").type(GEN_EMAIL);
    cy.get("#password-input").type(GEN_PASSWORD);
    cy.get("#confirm-password-input").type(GEN_PASSWORD);
    cy.get('input[type="checkbox"]').click();
    cy.get("#register-button").click();
    cy.wait(1000);
    login(GEN_EMAIL, GEN_PASSWORD);
  };
  
  Cypress.Commands.add("logIn", () => {
    login();
    cy.wait(2000);
    cy.contains("ทดลองใช้งานได้อีก 0 ชั่วโมง")
      .if("visible")
      .then(() => {
        // cy.get("button").contains("รับทราบ").click();
        cy.wait(2000);
        logout();
        cy.wait(1000);
        register();
      });

    })