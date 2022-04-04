import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {}
},{timestamps: true})

export default mongoose.models.User || mongoose.model("User", UserSchema);