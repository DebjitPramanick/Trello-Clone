import express from 'express'
import UserModel from '../Model/UserModel.js'
const router = express.Router()


// POST Requests ------------------

router.post(
    '/upload/user',
    async(req,res)=>{
        const data = {
            name: req.body.name,
            email: req.body.email,
            lists: req.body.lists,
            background: req.body.background,
            photo: req.body.photo
        }
        const user = new UserModel(data);
        try {
            await user.save();
            res.send(`Uploaded data...`)
        } catch (error) {
            console.log(error)
        }
    }
)

router.put(
    '/upload/list/:id',
    async (req, res) => {
        const data = {
            lists: req.body.lists
        }
        const id = req.params.id;
        try {
            await UserModel.findByIdAndUpdate(id, data, (err, updatedData) => {
                if (!err) res.send(`Updated list.`)
                else console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
)

router.put(
    '/upload/card/:id',
    async (req, res) => {
        const data ={
            lists: req.body.lists
        }
        const id = req.params.id;
        try {
            await UserModel.findByIdAndUpdate(id, data, (err, updatedData) => {
                if (!err) res.send(`Updated lists and cards.`)
                else console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
)

router.put(
    '/upload/bg/:id',
    async (req, res) => {
        const data ={
            background: req.body.background
        }
        const id = req.params.id;
        try {
            await UserModel.findByIdAndUpdate(id, data, (err, updatedData) => {
                if (!err) res.send(`Updated background.`)
                else console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
)



// GET Requests ------------------


router.get(
    '/users',
    async (req, res) => {
        UserModel.find({}, (error, result) => {
            if (error) res.send(error)
            else res.send(result)
        })
    }
)


router.get(
    '/user/:email',
    async (req, res) => {

        const email = req.params.email;

        UserModel.find({email}, (error, result) => {
            if (!error) res.send(result[0])
        })
    }
)


router.get(
    '/user/bg/:email',
    async (req, res) => {

        const email = req.params.email;

        UserModel.find({ email }, (error, result) => {
            if (!error) res.send(result[0])
        })
    }
)





export default router