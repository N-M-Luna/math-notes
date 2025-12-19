import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

//Serve files from /public folder (so we can serve html, css, and js files in one path).
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

//Use favicon
import favicon from 'serve-favicon';
app.use(favicon(path.join(__dirname, 'public', 'favicon_io', 'favicon.ico')))


//Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

//Render each article
import ejs from 'ejs'
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
import {articleTOC} from './articleTOC.js'
const footerPath = __dirname + `/views/footer.ejs`
const pieDePaginaPath = __dirname + `/views/pieDePagina.ejs`
const bttButtonPath = __dirname + '/views/backToTopBtn.ejs'
app.get('/article/:articleID', (req, res) => {
    const articleID = req.params.articleID
    const contentPath = __dirname + `/public/article/${articleID}.ejs`
    const {title, lang} = articleTOC.find(art => art.articleID === articleID)
    res.render('articleView', {
        title, //Title of article
        lang, //'es' or 'en
        contentPath, //path to view of content
        bttButtonPath, //path to view of back-to-top button
        footerPath, //path to view of footer
        pieDePaginaPath //path to view of footer in Spanish
    })
})

app.listen(PORT, () => {
    console.log('Server is running.');
});
