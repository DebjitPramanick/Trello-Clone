import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {type: String,},
    email: {type: String,},
    lists: [
        {
            title: {type: String},
            cards: [{
                title: {type: String},
                content: {type: String},
                date: {type: String}
                },
            ],
        },
    ],
    background: {type: String},
    photo: {type: String}
})

const UserModel = mongoose.model("userModel",UserSchema);
export default UserModel;