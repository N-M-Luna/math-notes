import express from 'express';
import { todos, nextTodoId } from './todos.js';

// Create an instance of the express app
const app = express();
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
//Define the middleware
const myMindlessMiddleware = (req, res, next) => {
    console.log('mid ' + req.method + ' ' + req.url)
    next();
}
//Register the middleware (bind the middleware to the instance of the express app)
app.use(myMindlessMiddleware) //Will run any time app.method() is called

// Home route
app.get('/', (req, res) => {
    res.status(200).send('Math is cool!');
});

// How to handle queries
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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//How to use router
app.get('/mate7', (req, res) => {
    res.sendFile(__dirname + '/public/mate7/index.html')
})
app.get('/mate7/:topicID', (req, res) => {
    const { topicID } = req.params;
    res.sendFile(__dirname + '/public/mate7/' + topicID + '.html')
})

app.listen(PORT, () => {
    console.log('Server is running.');
});


/* NatNote
    - Used https://www.javascripttutorial.net/express-tutorial/ to set up the Express app.
*/

// var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-8, 8, 8, -8]});
// var p = board.create('point', [1, 3], {name: 'point'});
