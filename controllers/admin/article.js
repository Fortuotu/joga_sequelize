const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://app:app_pw@localhost:3306/app_db");

const models = require('../../models');

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

module.exports = {
    createArticle
};
