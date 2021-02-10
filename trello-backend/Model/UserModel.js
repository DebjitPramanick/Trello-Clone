import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    lists: [
        {
            title: {type: String},
            cards: [{
                title: {type: String},
                content: {type: String},
                dateAdded: {type: String}
                },
            ],
        },
    ],
})

const UserModel = mongoose.model("userModel",UserSchema);
export default UserModel;