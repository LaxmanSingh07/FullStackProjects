import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**Register user */

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt(); //generate salt 
        //it is a random string that is added to the password to make it more secure

        const passwordHash = await bcrypt.hash(password, salt); //hash the password

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),

        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser); //201 means something is created
    }
    catch (error) {
        res.status(500).json({ error: error.message }); //500 means something went wrong
    }
}

/**Login user */


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findone({ email: email });
        if (!user) return res.status(400).json({ msg: "User not found" }); //400 means bad request

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //create a token which will be used to authenticate the user
        delete user.password; // delete the password from the user object so that it is not sent to the frontend
        res.status(200).json({ user, token }); //200 means success

    }
    catch {
        res.status(500).json({ error: error.message });
    }
}