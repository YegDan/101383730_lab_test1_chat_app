const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const setupSocket = require('./socket/index');
const userRouter = require('./routers/userRouter');
const uri = "mongodb+srv://rootadmin:rootadmin@cluster0.fpg8zxl.mongodb.net/"
const port = 8081;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}});

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(success => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error: ', err);
});
app.use(cors({origin: 'http://localhost:3000'}));
// app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', userRouter);

//setting up io
setupSocket(io);


app.get('/', (req, res) => {
    res.send('Hello World');
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});