'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const streamParserRouter = require('./routes/streamParse');
const clientRouter = require('./routes/client');
const port = process.env.NODE_DOCKER_PORT;
app.use(express.json());
app.use('/',express.static('public'))
app.use('/stream',streamParserRouter);
app.use('/client', clientRouter);
app.listen(port);