describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Superuser",
      username: "root",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
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
      cy.login({ username: "root", password: "salainen" });
    });

    it("a new note can be created", function () {
      cy.get("#show").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("Save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: true,
        });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .contains("make not important")
          .click();

        cy.contains("show all").click();

        cy.contains("another note cypress").contains("make important");
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.login({ username: "root", password: "salainen" });
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("show all").click();
        cy.contains("second note").contains("make important").click();

        cy.contains("second note").contains("make not important");
      });

      // it("one of those can be made important", function () {
      //   cy.contains("second note").parent().find("button").as("theButton");
      //   cy.get("@theButton").click();
      //   cy.get("@theButton").should("contain", "make not important");
      // });
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    // cy.contains("Wrong credentials");
    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    // cy.get("html").should("not.contain", "Superuser logged in");
    cy.contains("Superuser logged in").should("not.exist");
  });
});
