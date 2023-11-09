describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Superuser",
      username: "root",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("root");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("Superuser logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("root");
      cy.get("input:last").type("salainen");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.get("#show").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("Save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.get("#show").click();
        cy.get("#note-input").type("another note cypress");
        cy.contains("Save").click();
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("show all").click();

        cy.contains("another note cypress").contains("make important");
      });
    });
  });
});
