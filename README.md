# Business in Practice - KPI Rankings - Technical Test
The application stack in this monorepo consists of:
- technical-test-api (backend)
- technical-test-frontend (front end)
- [The original application is included for convenience]

## Running the stack
You will need Maven and Java 17 for the backend.

npm for the frontend.

There is a Docker Compose file in the root directory.

`docker-compose up `

to run the stack.

`docker-compose up --build`

to run the stack if you have made changes to the code.

You will see two running Docker containers housing the back end and the front end.

The backend is a Java Spring Boot REST app.
The frontend is a simple React application.

The backend serves the required JSON data via the single RESTful URL;

http://localhost:8080/date/[date]

e.g. http://localhost:8080/date/2023-06-19

## Running the stack without Docker Compose
If by chance yiu do not have Docker Compose installed on your environment or you wish 
to run the apps independently for speed and convenience.

At technical-test-api, run:

`mvn spring-boot:run`

At technical-test-frontend, run:

`npm i`

`npm start`

## Opening the front end in the browser
Go to:

`http://localhost:3000`

The KPI Rankings Table should be visible.

## Observations and Improvements
Due to time constraints, the following changes would be pending.

### Application design / code
1. There are a small number of backend tests, but no frontend tests.
2. During the npm build process there are some deprecated dependencies and some known vulnerabilities.
In a production grade app there would likely be some DAST/SAST container scanning.
3. The API is exposed on http not https.
4. The React app is not using Typescript (when I ran create-react-app for the boilerplate I forgot to 
include the typescript argument and didn't want to restart). A bigger app would undoubtedly benefit from stronger typing.
5. Secrets management.
6. App is not responsive.

### Application features
1. In the existing KPI application, teams of equal rank were marked with an '=' symbol in the Rank column.
I could not see any logical reason for this (although I'm not saying there isn't, there simply isn't enough info in the brief).
I have therefore replaced the '=' with the actual rank, so you will see multiple teams with the same rank.
2. Styling. I have applied minimal styling. React bootstrap is installed and could be used to easily style further.
3. Pivot feature. The data grid could be transposed to give KPIs as rows, teams as columns.
4. Logout feature / allow logins to persist across browser sessions (not the Google Auth default)