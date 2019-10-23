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
    cy.getCookie('eZSESSID').then(cookie => test.eZSESSID = cookie.value);
  });
};

export const withCyTag = value => `[data-cy=${value}]`;
