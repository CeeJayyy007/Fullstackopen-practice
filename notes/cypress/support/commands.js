Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedInUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3001/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedInUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:5173");
});
