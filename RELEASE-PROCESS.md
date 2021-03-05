# Publishing to NPM

## Configure Travis environment variables

Travis CI will automatically release to the npm registry when a tagged commit is pushed to the `master` branch.

It requires two environment variables to do so:

* `NPM_EMAIL`
* `NPM_API_KEY`

Instructions for obtaining and setting those variables is [available here](https://docs.travis-ci.com/user/deployment/npm/#npm-auth-token).

## Prepare for automatic Travis CI release

### On `develop` branch

#### 1. Update [CHANGELOG.md](CHANGELOG.md) to reflect the latest changes

Example:

```md
## Added

- Release process documentation.
```

Documentation for appending to a CHANGELOG.md file can be found on the [keepachangelog.com website](https://keepachangelog.com/).

#### 2. Prepare for release

Use the `npm run prepare-release` command to interactively increment the version number, push tags to GitHub, and create a GitHub release draft:

```sh
$ npm run prepare-release
```

The script uses the [`np` package](https://www.npmjs.com/package/np) behind the scenes, but publishing to npm directly has been disabled.

### On GitHub

#### 1. Create a new pull request into the `master` branch

Make sure to include the relevant changelog section in the pull request description.

#### 2. Merge when ready

Travis will take care of building and releasing the tagged version to npm.

#### 3. Draft a new release from the releases page

You can find the releases page [here](https://github.com/algorand/js-algorand-sdk/releases).

Be sure to follow the formatting style of previous releases and include the relevant changelog section in the release description.
