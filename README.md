# Temporal Data Maintenance System - suitable for medicinal purposes

### Installation and Setup

1. Install [npm - Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to run the Node.js server on your machine.
1. Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows) so you can store all the data.
1. Run MongoDB.
1. Rename the file that named "env-EXAMPLE.txt" in the project's folder to ".env" (yes I know it looks weird for people using .env files for the first time, but trust me).
1. Make sure that the LOINC API's username and password are correct in the ".env" file (you can make an account here: https://loinc.org).
1. Beside the public, routes and models folders add a new folder named "uploads".
1. Open the project's folder from a terminal window and run the following command `npm install` to install all the needed dependencies.
1. run the following command in the terminal: `npm install -g nodemon`.
1. After installing all the dependencies, run the following command in your terminal: `npm run start` to run the server on http://localhost:3000.
1. Go to http://localhost:3000.

#### Authors

1. Mohammad Ektelat & Hasan Yousef