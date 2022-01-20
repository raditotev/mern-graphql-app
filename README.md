# Book Event Demo App

Build with React, Nodejs, Express, Mongo, Mongoose and GraphQL. Based on academind ([github profile](https://github.com/academind)) [youtube series](https://academind.com/tutorials/graphql-with-node-react-full-app).

# Setup

- run `npm install` in the root of the project
- navigate to `/frontend` and run `npm install`
- back in the root of the project create `nodemon.json` file and populate with your [Mongo](https://cloud.mongodb.com/) secrets:
  ```json
  {
    "env": {
      "DB_USER": "xxxxxxx",
      "DB_PASSWORD": "xxxxxxx",
      "DB_NAME": "xxxxxxx"
    }
  }
  ```
- start your backend server `npm start`
- open new terminal session and `npm start` from `/frontend`.\
  Open [http://localhost:3000](http://localhost:3000) to view app in your browser.
