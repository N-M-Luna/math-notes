import express from 'express';
const app = express(); // Creates an instance of the express app
const PORT = process.env.PORT || 3000;

// How to use middleware
/*  NatNote

A middleware function is used for changing the req and res objs; for adding custom logic for validation, authentication, or authorization; for terminating the req-res cycle; for calling the next middleware function. The types are Application-level, Router-level, Built-in, Third-party, and Error-handling middleware.

A middleware looks like this:
function myMiddlewareFn(req, res, next) {

    //Do middleman sh!t

    //If you're not ready to end the req-res cycle, 'next' calls the next middleware function:
    next();

    //Else if you're ready to end, you can use one of the following:
    res.send() //sends a response body
    res.json() //send a JSON resonse
    res.redirect() //redirects the client to another URL
    res.end() //ends cycle without sending anything.
}
*/
// const myMindlessMiddleware = (req, res, next) => { //Defines the middleware
//     console.log('mid ' + req.method + ' ' + req.url)
//     next();
// }
// app.use(myMindlessMiddleware) //Registers the middleware. (Binds the middleware to the instance of the express app.) That means it will run any time app.method() is called.
// How to define a '/home' route
app.get('/home', (req, res) => {
    res.status(200).send('Math is cool!');
});
// How to handle queries
//import { todos, nextTodoId } from './todos.js';
app.get('/todos', (req, res) => {
    //If the URL has queries (e.g., http:// ... todos/?key=value )
    if (req?.query?.completed) { //If the key is completed (and the value true)
        const isCompleted = req.query.completed === 'true';

        //Find the todos with that feature and send it
        const filteredTodos = todos.filter(
            (todo) => todo.completed === isCompleted
        );
        res.send(filteredTodos);
    }

    res.send(todos);
});
app.post('/todos', (req, res) => {
  res.send('Create a new todo item');
});
// How to handle parameters
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Update the todo item with id ${id}`);
});
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Delete the todo item with id ${id}`);
});
app.get('/todos/:id', (req, res) => {//If the URL is .../todos/1,
    //Then the req.params object will have an key id with (string) value '1'.
    const {id} = req.params

    //Handle request when id number is not actually a number.
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        res.status(400).send(`Invalid id ${id}`);
    }

    //If it's a number, find the todo item with that id.
    const todo = todos.find((todo) => todo.id === todoId);

    //Send it if it exists.
    if (todo) res.status(200).send(todo);
    //Send 404 error if it does not exist.
    res.status(404).send(`Todo with id ${id} not found`);
});

//Serve files from /public folder (so we can serve html, css, and js files in one path).
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const footerPath = __dirname + `/views/footer.ejs`
const bttButtonPath = __dirname + '/views/backToTopBtn.ejs'
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//Render each subject and each lesson with ejs templates
import ejs from 'ejs'
import { subjectTOC } from './subjectTOC.js';
app.set('view engine', 'ejs'); // Sets EJS as the templating engine
app.set('views', __dirname + '/views');
app.get('/:subjectID', (req, res) => {
    const subjectID = req.params.subjectID
    const {subject, n, nOrd, topicTOC} = subjectTOC.find(s => s.subject === subjectID) //
    const units = Object.keys(topicTOC)
    const topics = units.map(unit => topicTOC[unit])
    const topicDirs = units.map(unit => topicTOC[unit].map(unitTitle => unitTitle.replaceAll(' ', '_')))
    res.render('subjectView', {
        subject, // eg, 'mate7'
        n, //eg, '7'
        nOrd, //eg 'Séptimo'
        units, // eg, ['Unidad 1', 'Unidad 2', ...]
        topics, // eg, [ ['Lección 1.1', 'Lección 1.2', ...], [...], ...]
        topicDirs, // eg, [ ['Lección_1.1', 'Lección_1.2', ...], [...], ...]
        bttButtonPath, //path to view of back-to-top button
        footerPath //path to view of footer
    })
})
app.get('/:subjectID/:topicID', (req, res) => {
    const subjectID = req.params.subjectID;
    const topicID = req.params.topicID;
    const currentSubject = subjectTOC.find(s => s.subject === subjectID)
    const contentPath = __dirname + `/public/${subjectID}/${topicID}.ejs`
    const topicList = Object.values(currentSubject.topicTOC).flat()
    const indx = topicList.indexOf(topicID.replaceAll('_', ' '))
    const prevTopicID = indx === 0 ? '' : topicList[indx-1]
    const nextTopicID = indx === topicList.length - 1 ? '' : topicList[indx+1]
    res.render('topicView', {
        ...currentSubject,
        /* current subject is an object with:
            subject // eg 'mate7'
            n // eg 7
            nOrd //eg 'Séptimo'
            topicTOC //eg {'Unidad 1': ['Lección 1.1', 'Lección 1.2', ...], ...}
        */
        topicID, // eg 'Título de la lección'
        contentPath, //path to view of content
        prevTopicID, // eg 'Título de la lección'
        nextTopicID, // eg 'Título de la lección'
        bttButtonPath, //path to view of back-to-top button
        footerPath//path to view of footer
    })
})

app.listen(PORT, () => {
    console.log('Server is running.');
});
