import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from "./Routers/Router.js"
import { createServer } from 'http'
import config from "./Config/config.js"
import * as io from 'socket.io'

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080;
const server = createServer(app);
server.listen(port, ()=>console.log(`Server is running at ${port}`));
app.get('/',(req,res)=>res.send("Server is running......"))


// DB

const connectionURL = config.url
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// ChangeStream

const socketIo = new io.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});


socketIo.on('connection', function (socket) {
    console.log('Client connected!');
});


const connection = mongoose.connection;


connection.once('open', () => {
    console.log("MongoDB databse connected.");

    const changeStream = connection.collection('usermodels').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change) => {
        switch (change.operationType) {
            case 'insert':
                const user = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    photo: change.fullDocument.photo
                }
                console.log(user)
                socketIo.emit('user-registered', user)
                break;

            case 'delete':
                socketIo.emit('user-deleted', change.documentKey._id)
                break;

            case 'update':
                const updatedUser = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    email: change.fullDocument.email,
                    lists: change.fullDocument.lists,
                    background: change.fullDocument.background
                }
                socketIo.emit('user-updated', updatedUser)
                socketIo.emit('list-updated', updatedUser.lists)
                break;
        }
    })

})



// Routes ------------------

app.use('/api', router)