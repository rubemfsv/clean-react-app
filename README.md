<center><h1>Clean React App</h1></center>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/rubemfsv/clean-react-app)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
![Node Version](https://img.shields.io/static/v1?label=node&message=18.18.0.0&color=00579d)
![React Version](https://img.shields.io/static/v1?label=react&message=18.2.0&color=42a5f5)

<img alt="Logo" align="right" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="20%" />

Create React apps using [Clean Architecture](https://dev.to/rubemfsv/clean-architecture-the-concept-behind-the-code-52do) with no build configuration.

- [User Guide](https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6) – How to develop apps bootstrapped with Clean React App.

Clean React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/rubemfsv/clean-react-app/issues/new).<br>

## Quick Overview

```sh
npx @rubemfsv/clean-react-app my-app
cd my-app
npm start or npm run dev
```

<hr />
<br />

**This boilerplate contains the following settings:**
- Local storage adapter;
- Axios as HTTP Client;
- Webpack configured for development and production environments;
- Basic end-to-end test settings with Cypress;
- Unit tests with Jest;
- Husky with pre-push to run unit tests;
- Authentication with validations;
- Validation layer for reuse of validations;
- Some hooks to help with API calls and form submissions;
- Private route configured;
- Three pages to help improve productivity:
  - Login page
  - Sign up page
  - Dashboard

<hr />
<br />


## :construction_worker:  **Installation**

**You must first have installed [NodeJS](https://nodejs.org/) (I recommend [nvm](https://github.com/nvm-sh/nvm) to deal with versions), [Yarn](https://yarnpkg.com/), and then:**

`git clone https://github.com/rubemfsv/clean-react-app.git`

Step 1:

`cd clean-react-app` - access the project files

Step 2:

`yarn` (or `npm install`) - to install dependencies

Step 3:

Change your `webpack.dev.js` and `webpack.prod.js` env url to your real urls

Step 4:

`yarn dev` (or `npm run dev`) - to initialize the project under development

Observations:

`yarn test` (or `npm run test`) - to run jest unit testing

`yarn test:e2e` (or `npm run test:e2e`) - to run cypress e2e testing (if you use linux or windows, the command may change because of the \, but you can change the script or run it by `node_modules/.bin/cypress open`)

`yarn start` (or `npm start`) - to initialize the project under production webpack;

In the package.json file, there are scripts that you can run with node and yarn

<hr />
<br />

## :open_file_folder: **Architecture**

The architecture used in this project was the [Clean Architecture](https://dev.to/rubemfsv/clean-architecture-the-concept-behind-the-code-52do), using the concepts proposed by Roberto Martin. To know how to implement this architecture, there is an [article applying this Architecture with React](https://dev.to/rubemfsv/arquitetura-limpa-aplicando-com-react-1eo0) that describes very well the thought line.


```
cypress/
src/
  data/
    protocols/
    test/
    usecases/
  domain/
    errors/
    models/
    test/
    usecases/
  infra/
    cache/
    http/
    test/
  main/
    adapters/
    config/
    decorators/
    factories/
      cache/
      decorators/
      http/
      pages/
      usecases/
    routes/
    scripts/
    index.tsx
  presentation/
    assets/
      fonts/
      images/
    components/
    hooks/
    pages/
    protocols/
    routes/
    styles/
    test/
  validation/
    errors/
    protocols/
    test/
    validators/
```
<br />

🖥️  **Login page**

It's a simple login page with a form and error handling. It already has input, button, field and loader components.

![Login page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vyruv5eroc1eb5p7ferj.png)


🖥️  **Sign up page**

It is a registration page with a form that receives the username, email, password and password confirmation. It already has error handling and reused components.

![Sign up page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r3ua2l7ybbsd9f06m57t.png)

🖥️  **Dashboard page**

It is an empty page that is redirected after successful login. It's there to help with development, saving time by being the starting point.

![Dashboard page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fxpg1sfmkt1dkfv12pbm.png)

<hr />
<br />

## :bookmark_tabs: Branches and contributions

As this project is intended to be open source and free for everyone to use, feel free to contribute improvements.

If something can be improved, just create a branch from `main` and make a Pull Request with the suggestions.

<hr />
<br />

## :bug: Issues

If something doesn’t work, please [file an issue](https://github.com/rubemfsv/clean-react-app/issues/new).

<br>

