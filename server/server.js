const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./handlers/HttpException');
const errorMiddleware = require('./handlers/error');
const routes = require('./routes/index');
require('./database/connect');

dotenv.config();

const port = Number(process.env.PORT || 4000);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.use(`/api`, routes);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`Server running on port ${port}!`));


module.exports = app;
