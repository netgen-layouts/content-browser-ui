# Netgen Content Browser user interface
This repository contains the user interface for Netgen Content Browser.

### Requirements
- [Node.js](https://nodejs.org/en/download/)
- [npm](http://npmjs.com) / [Yarn](https://yarnpkg.com)

## Development
After cloning this repository install dependencies:
```bash
$ yarn install
```

##### First time build configuration
Before building the project for the first time, you need to copy `.env.dist` file to `.env`.

### Starting the dev server
The app uses mock api by default so you need to start express server for api before starting webpack dev server.
```bash
# Start express server
$ yarn express

# Start webpack dev server
$ yarn start
```

This starts webpack dev server and you can access the app at `localhost:8181`.
Webpack watches for changes in files and automatically refreshes the app.

If you want to use real data from specific site for development, you need to change the `SITE_URL` parameter inside `.env` file to proxy all api requests to your site.
In that case you don't need to start express server. Run only the following:
```bash
# Start webpack dev server
$ yarn start
```

### Build
To build production assets run the following:
```bash
$ yarn build
```
This will build the app and place all generated assets into `bundle/Resources/public` folder.

### Tests
For end-to-end testing we use [Cypress](https://www.cypress.io/).
Tests are mostly written for test data so express server needs to be started before running them.
To run the tests in chrome while developing, start the cypress:
```bash
$ yarn cypress
```
This opens cypress window where you can click on `browser_test.js` which opens its own chrome window and runs the tests. Tests are automatically run whenever the app updates (on every file change) and test the development version of the app.

You can run the tests only after the production build to test production version of the app. In that case express and webpack servers need to be stopped and you can run:
```bash
$ yarn ci
```
This starts the express server and runs the tests in headless browser inside terminal.
