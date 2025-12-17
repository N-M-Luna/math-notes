This is a website with **notes on middle and high school math**.

Website uses vanilla HTML, CSS, and JS. It also uses [ExpressJS](https://expressjs.com/), [EJS](https://ejs.co/), [Katex](https://katex.org/) and [JSX graph](https://jsxgraph.uni-bayreuth.de/home/).

To view,
- Download repo.
- Run `npm i` and `npm start` on the terminal from the repo directory.
- Visit http://localhost:3000 to view the site.

-----------

To add new articles:
- Each new article needs a unique ID, which we will call here articleID.
- First, add `<p><a href='/article/articleID'> My article title </a></p>` under the appropriate `h2` in public/index.html.
- Then, add a new object to articleTOC.js with fields 'title', 'articleID', and 'lang'.
- Finally, add the content to a new file called public/article/articleID.ejs. In this file, any latex should be inbetween `$$...$$` and any jsx graphs should be in `<div class='jxgbox'></div>`. Other styling is in the file 'public/mate7/boilerplate.ejs'

-----------

TODO:
- Add practice problems to each article.
- Add English translations.