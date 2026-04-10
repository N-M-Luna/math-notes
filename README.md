This is a website with **notes on middle and high school math**.

Website uses vanilla HTML, CSS, and JS. It also uses [ExpressJS](https://expressjs.com/), [EJS](https://ejs.co/), [Katex](https://katex.org/) and [JSX graph](https://jsxgraph.uni-bayreuth.de/home/).

To view,
- Download repo,
- Run `npm i` and `npm start` on the terminal from the repo directory, and
- Visit http://localhost:3000 to view the site.

The site can also be viewed at https://math-notes-xi.vercel.app.

-----------

To add new articles:
- Each new article needs a unique ID, which we will call here articleID.
- First, add a new object to articleTOC.js with fields 'title', 'articleID', and 'lang'.
- Then, add the articleID to the approriate unit in mate7units in articleTOC.js.
- Finally, add the content to a new file called public/article/articleID.ejs. In this file, any latex should be inbetween `$$...$$` and any jsx graphs should be in `<div class='jxgbox'></div>`. Other styling is in the file 'public/mate7/boilerplate.ejs'

-----------

TODO:
- Fix previous / next lesson to article view. (outside mate7)
- Addendum to 'Slope triangles' (dado un punto y una pendiente, pon un 2do punto. y que pasa si la pendiente es negativa.)
- Add vocab view (by unit? by subject?) and add link to {.def strong} vocab words.
- Show my scratch paper in eg's and ejercicio's.
- Edit sizing for mobile.
- Add assessment view.
- Add views for topicHeader, def, eg, ejercicio, and intro/outro.
- Add practice problems to each article.
- Add English translations.
- Understand macros in LaTeX.
- Add in-line LaTeX expressions. ([docs on how to render](https://katex.org/docs/options))
- Display correctly all LaTeX expressions that are too long.