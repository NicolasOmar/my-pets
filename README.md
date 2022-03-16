# My Pets ![My Pets version](https://img.shields.io/github/package-json/v/nicolasomar/my-pets?color=success&label=%20&style=flat-square) ![My Pets Coverage](https://img.shields.io/codecov/c/github/nicolasomar/my-pets?label=%20&logo=codecov&style=flat-square)
Web page based on React for daily activity logging of family pets.

## What do I need?
Before cloning this repo, I recommend installing the following software:
- [Node](https://nodejs.org/en/download/) >=12.16.1 to install packages
- [API Repo](https://github.com/NicolasOmar/my-pets-api) to work in a local environment

## Setup
After cloning the repo, install the node packages in the project's root file.
```sh
git clone https://github.com/NicolasOmar/my-pets.git
cd my-pets
npm install
```

## How to run it
To run it as a single instance (using a production-like build)
```sh
npm start
```

## Folder structure
Once you have cloned the repo, it will show you the following folders:
- `.github:` [Github Actions](https://github.com/features/actions) files used to run post-merge.commits like unit test coverage collection.
- `.storybook:` Dedicated to [Storybook](https://storybook.js.org/) configuration.
- `env:` Environment variables.
- `public:` Structure where the library will point it's `App` component once initiated, it also contains styles, scripts, logos and other useful files.
- `scripts:` Location of the `update-version.js` file, responsible of update package's version on each push.
- `src:`
  - `components:` Location of all used components, using [Atomic Design hierarchy structure](https://atomicdesign.bradfrost.com/chapter-2/) (`atoms` -> `molecules` -> `organisms` -> `templates` -> `pages`)
  - `constants:` JSON files used to contain constant values like routes, validation cases and input classes.
  - `enums:` Similar to constants, will be merged to constants in the next versions
  - `functions:` Helper methods related to several features like encryption, data parsing and validation.
  - `graphql:` Location of the queries and mutations used trough [Apollo GraphQl](https://www.apollographql.com/).
  - `redux:` Code related to reducers and actions.

## Branches and Environments
Because I am using [Netlify](https://netlify.com/) to host the site, I am maintaining the `main` branch only.
Therefore, the following [link](https://my-pets-prod.netlify.app) sends you to the last deployed version.

## Find out more
| [Project Status](https://github.com/users/NicolasOmar/projects/1/views/1) | [Storybook site](https://my-pets-storybook.netlify.app/) | [Node Repo](https://github.com/NicolasOmar/my-pets-api) |
| :--- | :--- | :--- |
| Trello board for project status tracking | Site dedicated to show and test all the created components | Node API repository

## License
**MIT**