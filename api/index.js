const express = require('express');
const references = require('../references');
const app = express();
// const port = 3000;

app.set('view engine', 'pug');
app.set('views', __dirname + '/../views');

// app.use(express.static(__dirname + '/../public'));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
});

app.get('/', (req, res) => {
    res.render('index', {keywords: references.randomizeKeywords()});
});

// app.listen(process.env.PORT || port, () => {
//     console.log(`Express app running on http://localhost:${port}`);
// });

module.exports = app;