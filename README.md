This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Setup

1. install packages `npm install`
2. get the appropriate `.env` file (`.env.production.local` for production, `.env.development.local` and `.env.test.local` for development)

## Continuous Deployment

1. Merge to master on github
2. run command: `ssh -t anhd@45.55.44.160 "cd /var/www/anhd-council-client && sudo sh pull.sh"`

## Staging Deployment:

1. Merge to staging branch on github and push
2. run command: `ssh -t anhd@45.55.44.160 "cd /var/www/staging-anhd-council-client && sudo sh pull_staging.sh"`
