
This project was bootstrapped with [Express Application Generator](https://expressjs.com/en/starter/generator.html).

## Overview
This is the **BACKEND** part of the project.

### `npm install`
should be run after cloning to download all node modules.

### IMPORTANT
The secret Rome2Rio API Key (as found at the end of *ITHS - v17.pdf*) should be added in a<br>
file called *.env* in the root of the server directory. The content should have the following format:

ROME_2_RIO_KEY = *[key]* 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run server`

Will start the server with [nodemon](https://nodemon.io/) (instead of node)

### `npm run dev`

Will start both the client and the server (by using [concurrently](https://www.npmjs.com/package/concurrently)).

### `npm run client`

Will start just the client.
