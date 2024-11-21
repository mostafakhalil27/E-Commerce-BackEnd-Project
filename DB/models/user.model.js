import mongoose, { Schema, model } from "mongoose";
// schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min:3,
        max: 20
    },
    email: {
        type: String,
        uniqu: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    forgetCode: {
        type: String
    },
    activationCode: {
        type: String
    },
    status:{
        type: String, 
        enum:["online","offline"]
    },
    profileImage: {
        url: {
            type: String,
            default:"https://res.cloudinary.com/dqy3hy4xj/image/upload/v1691724644/amazon/user/blank-profile-picture-973460_1280_dgbcxs.webp"
        },
        id: {
            type: String,
            default: "amazon/user/blank-profile-picture-973460_1280_dgbcxs"
        }
    }
},
{timestamps: true});


export const User = mongoose.model.User || model("User", userSchema);