const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');
const validateRequest = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(validateRequest);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.use('/', (req, res, next) => {
  res.send('Unknown path');
});

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.zaczj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
