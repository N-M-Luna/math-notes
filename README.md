This is a website with **lecture notes for middle school math**.

Website uses HTML, CSS, and JS. It also uses [ExpressJS](https://expressjs.com/), [EJS](https://ejs.co/), [Katex](https://katex.org/) and [JSX graph](https://jsxgraph.uni-bayreuth.de/home/).

To view,
- Download repo.
- Run `npm i` and `npm start` on the terminal from the repo directory.
- Visit http://localhost:3000 to view the site.

To add new topics:
- The topic name (str of topicID with spaces instead of _) needs to be included in subjectTOC.js, under the appropriate lesson. (Take a look at the structure in subjectTOC.js)
- The content needs to be in public/subjectID/topicID.ejs with latex inbetween `$$...$$` and with jsx graphs in `<div class='jxgbox'></div>`

-----------

TODO:
- Add a 'previous topic' and 'next topic' btn at the end of topicView.ejs
- Add keywords to each lesson. Add search by keyword
- Add back to top btn to topicView and to subjectView