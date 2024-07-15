const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const bodyParser = require("body-parser");
var cors = require('cors');
const studentRoute = require('../server/routes/student.routes');
const teacherRoute = require('../server/routes/teacher.routes');
const sessionRoute = require('../server/routes/session.routes');
const questionRoute = require('../server/routes/question.routes');


mongoose
  .connect('mongodb://127.0.0.1:27017/brightboostDB')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cors());


app.use('/students', studentRoute);
app.use('/teachers', teacherRoute);
app.use('/sessions', sessionRoute);
app.use('/questions', questionRoute);

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with the origin of your frontend
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (client) => {
  client.on('newQuestion', (question) => {
    io.emit('questionAdded', question);
  });
  client.on('disconnect', () => {
    console.log('A user disconnected from the WebSocket');
  });
});

const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// app.listen(port, () => {
//   console.log('Connected to port ' + port);
// });

server.listen(port, () => {
  console.log('Server is running on port ' + port);
});
// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});




// app.get ("/", function(req, res){
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/", function (req, res){

//     // console.log(req.body);
//     var inputText = req.body.randomText; 
//     res.send("The entered text is " + inputText);
//   });


// app.listen(4000, function () {
//   console.log("Server is running on Port 4000.");
// });
