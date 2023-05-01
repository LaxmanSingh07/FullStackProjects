//model contains the schema for the user

import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(

    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 25
        },
        lastName: {
            type: String,
            required: true,
            min: 3,
            max: 25
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },

        password: {
            type: String,
            required: true,
            min: 8,
        },
        picturePath: {
            type: String,
            default: ""
        },

        friends:{
            type: Array,
            default: []

        },
        location:String,
        occupation:String,
        viewedProfile:Number,
        impressions:Number,

    },
    {
        timestamps: true
    });

    const User = mongoose.model("User", UserSchema);
    export default User;