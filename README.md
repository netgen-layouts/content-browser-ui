# Netgen Content Browser user interface

This repository contains the user interface for Netgen Content Browser.

## Requirements

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Development

After cloning the repository, install the dependencies with:

```bash
$ yarn install
```

## First time build configuration

Before building the project for the first time, you need to copy `.env.dist` file to `.env`. This file specifies
basic configuration for development and running the tests.

## Starting the development server

The app uses a mock API by default, provided by the included Express server, which you need to start before starting
the Webpack development server:

```bash
# Starts the Express server
$ yarn express

# Starts the Webpack development server
$ yarn start
```

You can now access the app at `http://localhost:8181`. Webpack watches for changes in files and automatically
refreshes the app.

If you want to use real data from your backend CMS for development of Content Browser, you need to change
the `SITE_URL` parameter inside `.env` file to proxy all API requests to your site.

In that case, you don't need to start the Express server. Run only the following:

```bash
# Starts the Webpack development server
$ yarn start
```

## Build

To build the production assets run the following:

```bash
$ yarn build
```

This will build the app and place all generated assets into `bundle/Resources/public` folder.

## Tests

For end-to-end testing this repo uses [Cypress](https://www.cypress.io). Tests are mostly written
for test data so Express server needs to be started before running them. To run the tests continuously
in Google Chrome while developing, start Cypress with:

```bash
$ yarn cypress
```

This opens a window where you can click on `browser_test.js` which opens its own Google Chrome window
and runs the tests. Tests are automatically ran whenever the app updates (on every file change).

When ran standalone, tests use the production build of the app:

```bash
$ yarn ci
```

This starts the Express server and runs the tests in a headless browser.
