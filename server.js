const express = require('express');
const app = express();
const streamParserRouter = require('./routes/streamParse');

app.use('/',express.static('public'))
app.use('/stream',streamParserRouter);
app.listen(8333);