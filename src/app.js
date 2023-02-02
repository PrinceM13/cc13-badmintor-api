require('dotenv').config();
const express = require('express');
const chalk = require('chalk');

const notFoundMiddleWare = require('./middlewares/not-found');
const errorMiddleWare = require('./middlewares/error');

const app = express();

// middleware
app.use(express.json());

// router

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`)));