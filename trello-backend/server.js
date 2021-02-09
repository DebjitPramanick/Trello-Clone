import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from "./Routers/Router.js"
import { createServer } from 'http'
import config from "./Config/config.js"

const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000;
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

// Routes ------------------

app.use('/api', router)