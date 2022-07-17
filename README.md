<center><h1>Clean React App</h1></center>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/rubemfsv/clean-react-app)

<img alt="Logo" align="right" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="20%" />

Create React apps with no build configuration.

- [Creating a Clean React App](#creating-an-app) – How to create a new app.
- [User Guide](https://dev.to/rubemfsv/arquitetura-limpa-aplicando-com-react-1eo0) – How to develop apps bootstrapped with Clean React App.

Clean React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/rubemfsv/clean-react-app/issues/new).<br>

## Quick Overview

```sh
npx @rubemfsv/clean-react-app my-app
cd my-app
npm start or npm run dev
```

This boilerplate contains three pages:

- Login page
- Sign up page
- Dashboard

<hr />
<br />

🖥️ **Login page**

Page description

🖥️ **Sign up page**

Page description

🖥️ **Dashboard page**

Page description

<br />

:construction_worker: **Installation**

**You must first have installed [NodeJS](https://nodejs.org/) in its 14.20.0 version (I recommend [nvm](https://github.com/nvm-sh/nvm) to deal with versions), [Yarn](https://yarnpkg.com/), and then:**

`git clone https://github.com/rubemfsv/clean-react-app.git`

Stepß 1:

`cd clean-react-app` - access the project files

Step 2:

`yarn` (or `npm install`) - to install dependencies

Step 3:

`yarn dev` - to initialize the project under development

Observations:

`yarn test` - to run jest unit testing

`yarn test:e2e` - to run cypress e2e testing (if you use linux or windows, the command may change because of the \, but you can change the script or run it by `node_modules/.bin/cypress open`)

`yarn start` - to initialize the project under production webpack;

In the package.json file, there are scripts that you can run with node and yarn

<br />

:open_file_folder: **Architecture**

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



