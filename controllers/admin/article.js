const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://app:app_pw@localhost:3306/app_db");

const models = require('../../models');
const { getArticleById, deleteArticleById } = require("../article");

/*
curl -X POST http://localhost:3000/admin/article/create \ 
    -d "name=sigma_balls" \
    -d "slug=sigma_balls" \
    -d "image=yoga-therapy.jpg" \
    -d "body=<p>Lorem ipsum body contents.</p>"
*/
const createArticle = (req, res) => {
    let name = req.body.name;
    let slug = req.body.slug;
    let image = req.body.image;
    let body = req.body.body;

    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
    .then(article => {
        console.log(article);
        return res.status(200).json({ message: 'New article is added' });
    })
    .catch(error => {
        return res.status(500).send(error.message);
    }); 
}

/*
curl -X POST http://localhost:3000/admin/article/edit/1 \ 
    -d "name=update_test" \
    -d "slug=sigma_balls_67" \
*/
const updateArticle = (req, res) => {
    if (req.method === 'GET') {
        return getArticleById(req, res);
    } else if (req.method === 'DELETE') {
        return deleteArticleById(req, res);
    }

    const articleId = req.params.id;
    if (articleId === undefined) {
        return res.status(400).json({ message: 'No id for update' });
    }

    const fields = ['name', 'slug', 'image', 'body'];
    const dataToUpdate = {};

    fields.forEach(field => {
        if (req.body[field] !== undefined) {
            dataToUpdate[field] = req.body[field];
        }
    });

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'No fields provided for update' });
    }

    models.Article.update(
        dataToUpdate,
        {
            where: {
                id: articleId 
            },
        },
    )
    .then(([rowsUpdated]) => {
        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Article not found.' });
        }
        return res.status(200).json({ message: 'Article updated successfully' });
    })
    .catch(error => {
        return res.status(500).send(error.message);
    });
}

module.exports = {
    createArticle, updateArticle
};
