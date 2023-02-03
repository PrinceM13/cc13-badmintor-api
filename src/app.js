// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('./routes/auth-route');
const profileRoute = require('./routes/profile-route')

const authenticateMiddleware = require('./middlewares/authenticate');
const notFoundMiddleWare = require('./middlewares/not-found');
const errorMiddleWare = require('./middlewares/error');

const app = express();

// middleware
app.use(morgan('dev'));     // to log request
app.use(helmet());          // to protect http
app.use(cors());            // to connect with front
app.use(express.json());    // to get BODY data

// router
app.use('/auth', authRoute);
app.use('/profile', authenticateMiddleware, profileRoute);

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`)));