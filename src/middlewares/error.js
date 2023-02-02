const chalk = require('chalk');

module.exports = (err, req, res, next) => {
    console.log(chalk.magentaBright.italic.bold(err));
    res.status(err.statusCode || 500).json({ message: err.message });
};