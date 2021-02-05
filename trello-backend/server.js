import express from 'express'
import cors from 'cors'
import router from "./Routers/Lists.js"


const app = express();
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server is running at ${port}`));
app.get('/',(req,res)=>res.send("Server is running......"))

// Routes ------------------

app.get('/lists', router)