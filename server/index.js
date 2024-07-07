'use strict';
require('express-group-routes');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

// ROUTES
const registration = require('./routers/registration/v1/register');

app.use(cors());
app.use(bodyParser.json());

registration(app);

const port = 3001;
app.listen(3001);

console.info(`===> Running on port ${port}`);

module.exports = app;
