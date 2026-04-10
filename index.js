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
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


//Routes
import ejs from 'ejs'
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const footerPath = __dirname + '/views/footer.ejs'
const pieDePaginaPath = __dirname + '/views/pieDePagina.ejs'
const bttButtonPath = __dirname + '/views/backToTopBtn.ejs'
const langCntrlPath = __dirname + '/views/langControlBtn.ejs'

//Home route
import {mate7units, articleTOC} from './articleTOC.js'
const mate7articles = [] //List of mate 7 articles' ID
let mate7menu = ``
for (const myUnit in mate7units) {
    mate7menu += `<h3>Unidad: ${myUnit}</h3>
    `
    const unitList = mate7units[myUnit]
    mate7articles.push(...unitList)
    for(let i = 0; i < unitList.length; i++) {
        const articleObj = articleTOC.find(art => art.articleID === unitList[i])
        mate7menu += `<p><a href='/article/${unitList[i]}'> ${articleObj.title}</a></p>
        `
    }
}
app.get('/', (req, res) => {
    res.render(__dirname + '/public/index.ejs', {
        mate7menu, //html for math-list of mate 7
        bttButtonPath, //path to view of back-to-top button
        footerPath, //path to view of footer
        pieDePaginaPath, //path to view of footer in Spanish
        langCntrlPath //path to view the language controls
    })
});

//Article route
app.get('/article/:articleID', (req, res) => {
    //Get article ID and find the title and language in the article TOC
    const articleID = req.params.articleID
    const contentPath = __dirname + `/public/article/${articleID}.ejs`
    const {title, lang} = articleTOC.find(art => art.articleID === articleID)

    //Get article ID and title of previous lesson
    const articleIndx = mate7articles.indexOf(articleID)
    const prevArticleID = articleIndx === 0 ? '' : mate7articles[articleIndx - 1]
    const prevArticleObj = articleTOC.find(art => art.articleID === prevArticleID)
    const prevArticleTitle = prevArticleObj?.title

    //Get article ID and title of next lesson
    const nextArticleID = articleIndx === mate7articles.length - 1 ? '' : mate7articles[articleIndx + 1]
    const nextArticleObj = articleTOC.find(art => art.articleID === nextArticleID)
    const nextArticleTitle = nextArticleObj?.title

    res.render('articleView', {
        title, //string of title of article
        lang, //'es' or 'en'
        contentPath, //string of path to view of content
        bttButtonPath, //string of path to view of back-to-top button
        footerPath, //string of path to view of footer
        pieDePaginaPath, //string of path to view of footer in Spanish
        prevArticleID,
        prevArticleTitle,
        nextArticleID,
        nextArticleTitle
    })
})

app.listen(PORT, () => {
    console.log('Server is running.');
});
