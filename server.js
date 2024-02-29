const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');

mongoose.connect('mongodb://localhost/bharatInternDatabase');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/articles', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
});

app.use('/articles', require('./routes/articles'));

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
