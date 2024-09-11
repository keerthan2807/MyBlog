const express = require('express');
const slugify = require('slugify');
const router = express.Router();

module.exports = function(mockArticles) {
    // Create new article route
    router.get('/new', (req, res) => {
        res.render('articles/new', { article: {} });
    });

    // Edit article route
    router.get('/edit/:slug', (req, res) => {
        const article = mockArticles.find(a => a.slug === req.params.slug);
        if (!article) return res.redirect('/');
        res.render('articles/edit', { article: article });
    });
    

    // Show article route
    router.get('/:slug', (req, res) => {
        const article = mockArticles.find(a => a.slug === req.params.slug);
        if (!article) return res.redirect('/');
        res.render('articles/show', { article: article });
    });

    // Create new article (mock)
    router.post('/', (req, res) => {
        const newArticle = {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
            createdAt: new Date(),
            slug: slugify(req.body.title, { lower: true, strict: true }),
            sanitizedHTML: req.body.markdown // Simplified for this mock
        };
        mockArticles.push(newArticle);
        res.redirect(`/articles/${newArticle.slug}`);
    });

    // Edit existing article (mock)
    router.put('/:slug', (req, res) => {
        const article = mockArticles.find(a => a.slug === req.params.slug);
        if (article) {
            article.title = req.body.title;
            article.description = req.body.description;
            article.markdown = req.body.markdown;
            article.sanitizedHTML = req.body.markdown; // Simplified for this mock
            res.redirect(`/articles/${article.slug}`);
        } else {
            res.redirect('/');
        }
    });

    // Delete article (mock)
    router.delete('/:slug', (req, res) => {
        console.log(`Attempting to delete article with slug: ${req.params.slug}`);
        const index = mockArticles.findIndex(a => a.slug === req.params.slug);
        if (index !== -1) {
            console.log(`Article found at index: ${index}`);
            mockArticles.splice(index, 1);
            console.log(`Article deleted`);
        } else {
            console.log(`Article not found`);
        }
        res.redirect('/');
    });
    
    
    return router;
};
