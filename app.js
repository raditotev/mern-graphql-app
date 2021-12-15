const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/', (req, res, next) => {
  res.send('Hello');
});

app.listen(3000);
