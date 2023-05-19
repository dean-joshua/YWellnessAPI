const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// We need to use this in order to fetch from other local host
const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

app.use(bodyParser.json());
app.use('/', require('./routes')).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port ' + (process.env.port || 3000));
