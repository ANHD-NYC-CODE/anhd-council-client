This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## PreSetup

1. Make sure python version is below 3.0

## Setup

1. install packages `npm install`
2. get the appropriate `.env` file (`.env.production.local` for production, `.env.development.local` and `.env.test.local` for development)

## Continuous Deployment

1. Merge to master on github
2. run command: `ssh -t anhd@45.55.44.160 "cd /var/www/anhd-council-client && sudo sh pull.sh"` (or run `sh deploy.sh` helper script)

## Staging Deployment:

1. Merge to staging branch on github and push
2. run command: `ssh -t anhd@45.55.44.160 "cd /var/www/staging-anhd-council-client && sudo sh pull_staging.sh"` (or run `sh deploy_staging.sh` helper script)

The helper scripts automate the deploy process of pulling from github, installing packages, building the bundle, and restarting the nginx server in the backend directory of the server.

## ITLORB ERROR ON DEPLOYMENT:

You may get an error like "gyp ERR! stack Error: EACCES: permission denied, mkdir '/var/www/anhd-council-client/node_modules/iltorb/build' on deployment. You may ignore it and just wait for the deployment to continue.

### Version Check: Ensure your NPM, Python, and Node versions match the server

ie. "node -v" should be v14.21.1
"npm -v" should be 6.14.17
Python-2.7.18 installed via pyenv 2.4.0
node-gyp may need to be rebuilt.
may also have to 'npm config set legacy-peer-deps true"
