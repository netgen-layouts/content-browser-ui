export const loginToAdmin = (test) => {
  const options = {
    method: 'POST',
    url: '/ngadminui/login_check',
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
