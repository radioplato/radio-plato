This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

Clone the project and install required packages. Make sure you have the Node installed on your computer!

## Environments

In order to run an application in different environments, [env-cmd](https://www.npmjs.com/package/env-cmd) package is used. Scripts from the next section use `.env` files to run an application provided with specific environmental variables.

The file should contain such fields:

```
REACT_APP_ENV =
REACT_APP_BACKEND_URL =
REACT_APP_STREAM_URL =
REACT_APP_DATA_URL =
```

* `REACT_APP_ENV` - a string with the environment's name. `local`, `production`, `stage`, etc. Notice that the name is checked in the application code. Application built in `production` mode uses different routing strategy;
* `REACT_APP_BACKEND_URL` - your backend URL goes here;
* `REACT_APP_STREAM_URL` - the radio broadcasting URL;
* `REACT_APP_DATA_URL` - an endpoint of the radio casting server which returns the stream metadata;

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Requires `.env.local` file.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder. Requires `.env.production` file.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run build`

Similar to the previous one, but uses different `PUBLIC_URL`. It makes this script perfect for GH Pages deployment. Requires `.env.staging` file.<br />

### `npm run deploy:staging`

Performs the build operation in staging mode and deploys the bundle to GitHub Pages.

## Developed by

* **George aka Finds** - [GitStearis](https://github.com/GitStearis);
* **Pavel aka Stereobeaver** - [pavel-kirpikau](https://github.com/pavel-kirpikau).


