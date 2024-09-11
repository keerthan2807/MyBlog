const express = require('express')
// const mongoose = require('mongoose')
const articleRouter = require("./routes/articles")
const methodOverride = require('method-override')
const app = express()

app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

const mockArticles = [
    {
        title: "First Article",
        description: "This is the first article.",
        markdown: "This is the markdown content of the first article.",
        createdAt: new Date(),
        slug: "first-article",
        sanitizedHTML: "<p>This is the markdown content of the first article.</p>",
    },
    {
        title: "Second Article",
        description: "This is the second article.",
        markdown: "This is the markdown content of the second article.",
        createdAt: new Date(),
        slug: "second-article",
        sanitizedHTML: "<p>This is the markdown content of the second article.</p>",
    }
];

app.get('/', (req, res) => {
    res.render('articles/index', { articles: mockArticles });
});


app.use('/articles', articleRouter(mockArticles)); 

app.listen(3002, () => {
    console.log('Server running on http://localhost:3002');
});
