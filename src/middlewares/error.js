const chalk = require('chalk');

module.exports = (err, req, res, next) => {
    console.log(chalk.magentaBright.italic.bold(err));

    if (err.name === 'JsonWebTokenError') { err.statusCode = 401 }

    res.status(err.statusCode || 500).json({ message: err.message });
};