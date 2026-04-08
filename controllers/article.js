const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://app:app_pw@localhost:3306/app_db");

const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

const getAllArticles = (req, res) => {
    Article.findAll()
    .then(articles => {
        return res.status(200).json({ articles });
    })
    .catch(error => {
        return res.status(200).send(error.message);
    });
}

module.exports = { getAllArticles };