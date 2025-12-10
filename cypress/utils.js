/* global cy */

export const loginToAdmin = (test) => {
  const options = {
    method: 'POST',
    url: '/admin/login_check',
    form: true,
    body: {
      _username: 'admin',
      _password: 'publish',
    }
  }
  cy.request(options).then(() => {
    cy.getCookie('IBX_SESSION_ID').then(cookie => test.IBX_SESSION_ID = cookie.value);
  });
};

export const withCyTag = value => `[data-cy=${value}]`;
