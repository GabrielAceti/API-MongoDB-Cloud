const express = require('express');
const app = express();
const route = require('../routes/index');

app.use(express.json());
app.listen(3001);
app.use('/', route);

module.exports = app;