const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const articleAdminController = require('../controllers/admin/article');
const path = require('path');

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);
router.get('/author/:id', articleController.getArticlesByAuthor);

router.post('/admin/article/create', articleAdminController.createArticle);
router.get('/admin/article/edit/:id', articleAdminController.updateArticle);
router.post('/admin/article/edit/:id', articleAdminController.updateArticle);
router.delete('/admin/article/edit/:id', articleAdminController.updateArticle);

router.get('/admin/article/edit', (req, res) => { res.sendFile(path.join(__dirname, '../views/edit-article.html')); });

module.exports = router;