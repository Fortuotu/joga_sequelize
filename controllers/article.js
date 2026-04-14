const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://app:app_pw@localhost:3306/app_db");

const models = require('../models');

const getAllArticles = (req, res) => {
    models.Article.findAll()
    .then(articles => {
        return res.status(200).json({ articles });
    })
    .catch(error => {
        return res.status(200).send(error.message);
    });
}

const getArticleBySlug = (req, res) => {
    models.Article.findOne({
        where: {
            slug: req.params.slug
        },
        include: [
            {
                model: models.Author,
            },
            {
                model: models.Tags,
                through: {
                    model: models.ArticleTags
                }
            }

        ],
    })
    .then(article => {
        return res.status(200).json({ article })
    })
    .catch(error => {
        return res.status(500).send(error.message)
    });
}

const getArticlesByAuthor = (req, res) => {
    models.Article.findAll({
        where: {
            author_id: req.params.id
        }
    })
    .then(articles => {
        return res.status(200).json({ articles })
    })
    .catch(error => {
        return res.status(500).send(error.message)
    });
}

module.exports = { getAllArticles, getArticleBySlug, getArticlesByAuthor };