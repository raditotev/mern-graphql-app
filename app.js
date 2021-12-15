const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(event: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      events: () => events,
      createEvent: ({ event }) => {
        const newEvent = {
          _id: Math.random().toString(),
          title: event.title,
          description: event.description,
          price: +event.price,
          date: event.date,
        };
        events.push(newEvent);
        return newEvent;
      },
    },
    graphiql: true,
  })
);

app.use('/', (req, res, next) => {
  res.send('Hello');
});

app.listen(3000);
