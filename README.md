# My Pets
Web system for families. It helps them manage and keep track of everything related to their pets.

## Table of contents

- [Status](#status)
- [Dependencies](#dependencies)
- [What do I need?](#what-do-i-need)
- [Setup](#setup)
- [How to run it](#how-to-run-it)
- [Folder structure](#folder-structure)
- [Branches and Environments](#branches-and-environments)
- [Find out more](#find-out-more)
- [License](#license)

## Status
![Project version][badge-repo-version]
[![Code Coverage][badge-code-coverage]][link-code-coverage]
[![Quality Gate Status][badge-soundcloud-quality]][link-soundcloud-status]
[![Maintainability Rating][badge-soundcloud-maintanibility]][link-soundcloud-status]
[![Security Rating][badge-soundcloud-security]][link-soundcloud-status]
[![Technical Debt][badge-soundcloud-tech-debt]][link-soundcloud-status]
[![Known Vulnerabilities][badge-snyk-status]][link-snyk-status]
![GitHub Repo stars][badge-github-repo-stars]
![GitHub commit activity][badge-github-commits]
![GitHub last commit][badge-github-last-commit]

[badge-repo-version]: https://img.shields.io/github/package-json/v/nicolasomar/my-pets?label=version&logo=npm&color=success
[badge-code-coverage]: https://img.shields.io/codecov/c/github/nicolasomar/my-pets?label=coverage&logo=codecov
[link-code-coverage]: https://app.codecov.io/gh/NicolasOmar/my-pets
[badge-soundcloud-quality]: https://sonarcloud.io/api/project_badges/measure?project=NicolasOmar_my-pets&metric=alert_status
[badge-soundcloud-maintanibility]: https://sonarcloud.io/api/project_badges/measure?project=NicolasOmar_my-pets&metric=sqale_rating
[badge-soundcloud-security]: https://sonarcloud.io/api/project_badges/measure?project=NicolasOmar_my-pets&metric=security_rating
[badge-soundcloud-tech-debt]: https://sonarcloud.io/api/project_badges/measure?project=NicolasOmar_my-pets&metric=sqale_index
[link-soundcloud-status]: https://sonarcloud.io/summary/new_code?id=NicolasOmar_my-pets
[badge-snyk-status]: https://snyk.io/test/github/nicolasomar/my-pets/badge.svg
[link-snyk-status]: https://snyk.io/test/github/nicolasomar/my-pets
[badge-github-repo-stars]: https://img.shields.io/github/stars/nicolasomar/my-pets?label=stars&logo=github&labelColor=535353&style=flat
[badge-github-commits]: https://img.shields.io/github/commit-activity/m/nicolasomar/my-pets?logo=github
[badge-github-last-commit]: https://img.shields.io/github/last-commit/nicolasomar/my-pets?logo=github

## Dependencies
![react dependency][badge-dependency-react]
![prop-types dependency][badge-dependency-prop-types]
![vite dependency][badge-dependency-vite]
![vitest dependency][badge-dependency-vitest]
![graphql dependency][badge-dependency-graphql]
![apollo dependency][badge-dependency-apollo]
![react-router-dom dependency][badge-dependency-react-router-dom]
![validator dependency][badge-dependency-validator]
![bulma dependency][badge-dependency-bulma]
![storybook dependency][badge-dependency-storybook]
![react testing library dependency][badge-dependency-react-testing-library]
![eslint dependency][badge-dependency-eslint]
![prettier dependency][badge-dependency-prettier]

[badge-dependency-react]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/react/main?logo=react
[badge-dependency-prop-types]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/prop-types/main?logo=prop-types
[badge-dependency-vite]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/vite/main?logo=vite
[badge-dependency-vitest]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/vitest/main?logo=vitest
[badge-dependency-graphql]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/graphql/main?logo=graphql
[badge-dependency-apollo]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/@apollo/client/main?logo=apollographql
[badge-dependency-react-router-dom]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/react-router-dom/main?logo=reactrouter
[badge-dependency-validator]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/validator/main
[badge-dependency-bulma]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/bulma/main?logo=bulma
[badge-dependency-storybook]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/storybook/main?logo=storybook
[badge-dependency-react-testing-library]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/@testing-library/react/main?logo=testinglibrary
[badge-dependency-eslint]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/eslint/main?logo=eslint
[badge-dependency-prettier]: https://img.shields.io/github/package-json/dependency-version/nicolasomar/my-pets/dev/prettier/main?logo=prettier

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
| Project board for project status tracking | Site dedicated to show and test all the created components | Node API repository

## License
**MIT**