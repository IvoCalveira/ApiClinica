'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./app/config');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('./app/routes'));


app.listen(port, () => console.log(`Listening on port: ${port}`));
