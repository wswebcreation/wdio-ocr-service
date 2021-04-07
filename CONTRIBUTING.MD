# Contributing

## Proposing a Change
We are happy for every idea you have that improves the usability of this module. If you have an idea about a new feature
please raise a [feature request](https://github.com/wswebcreation/wdio-ocr-service/issues/new?template=--feature-request.md)
first to get feedback on it. This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away, but we still recommend to file an issue
detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Setting up the project
In order to set up this project and start contributing follow this step by step guide:

* Fork the project.
* Clone the project somewhere on your computer

    ```sh
    git clone git@github.com:<your-username>/wdio-ocr-service.git
    ```

* If you need to update your fork you can do so following the steps
  [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
* Switch to Node v14 LTS (you should be able to use older/newer versions of Node but we recommend to use v14 LTS so all
  developers are on the same side). We recommend to use [`nvm`](https://github.com/nvm-sh/nvm) to switch between Node.js versions.
* Set up the project:

    ```sh
    npm install
    ```
* Run Tests to ensure that everything is set up correctly

    ```sh
    npm run test.unit
    ```
  It should give you a passing result. Now you can move on to set up your development environment and start working on
  some code. If tests do not pass please create an issue and provide logs to the error.

## Work on the code
If you start making changes then make sure you listen to file changes and transpile the code every time you press save.
To do that, run:

```sh
npm run watch
```

It is also a good idea to run jest in watch mode while developing on a single package to see if changes affect any
tests:

```sh
npm run test.unit.coverage.watch
```

> **NOTE:** Also add (multiple) unit tests for every code change to ensure that your changes cover all necessary
> code paths.

### Test Pipeline
When a PR gets submitted, `wdio-ocr-service` runs the following checks:

- *ESLint*
  A common ESLint test to align code styles and detect syntax errors early.
  You can manually trigger this check by calling:

  ```sh
  npm run test.lint
  ```
- *Unit Tests*
  Like every project we unit-test our code and ensure that new patches are properly tested. The coverage threshold is
  pretty high so ensure that your changes cover all necessary code paths. We are using [Jest](https://jestjs.io/) as a
  unit test framework here.
  You can manually trigger this check by calling:

  ```sh
  npm run test.unit.coverage
  ```

### Deploying the Documentation Locally
After you have [set up the project](./CONTRIBUTING.MD#setting-up-the-project) you can go into the `website` directory to
set up the docs page and run it on your local machine. To do so, run:

```sh
$ cd website
$ npm install
$ npm start
```

This will set up everything needed to run the page on [`localhost:3000`](http://localhost:3000/). If you need to run on
a different host or port, pass them as additional arguments to npm start, like `-- --host 0.0.0.0`.

You can now modify the content of the
[`/website/docs`](https://github.com/wswebcreation/wdio-ocr-service/tree/main/website/docs) files as well as change
styles and templates. The page will be automatically updated.

### Deploying the Documentation in Production
Every time a new release is pushed to GitHub the `wdio-ocr-service` docs need to be build and re-deployed to the
project's GitHub Page. The process is defined in a GitHub Actions
[pipeline](https://github.com/wswebcreation/wdio-ocr-service/blob/main/.github/workflows/documentation.yml). All you
need to do (as maintainer) is to trigger the pipeline. The rest is handled by the workflow.
