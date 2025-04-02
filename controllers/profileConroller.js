import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import profileModel from "../models/profileModel.js";
import bcryptjs from 'bcryptjs'

export const loginProfile = async (req, res) => {
    try {
        const { identify, password } = req.body;
        console.log(identify);
        // ✅ 1. Check if user exists (by username or email)
        const user = await profileModel.findOne({
            $or: [{ username: identify }, { email: identify }]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // ✅ 2. Verify Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // ✅ 3. Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "7d" } // Token expires in 7 days
        );

        // ✅ 4. Update Last Seen History
        await profileModel.findByIdAndUpdate(user._id, {
            $push: { lastSeenHistory: new Date() }
        });

        // ✅ 5. Send Response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const signupProfile = async (req, res) => {
    try {
        const { name, last_name, username, email, recovery_email, password, profile_dp, profile_banner, reminders_email } = req.body;

        // ✅ 1. Check if User Already Exists
        const existingUser = await profileModel.findOne({
            $or: [{ username }, { email }, { recovery_email }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ 3. Create New User
        const newUser = new profileModel({
            name,
            last_name,
            username,
            email,
            recovery_email,
            password: hashedPassword,
            profile_dp,
            profile_banner,
            reminders_email
        });

        await newUser.save();

        // ✅ 4. Generate JWT Token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, username: newUser.username },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // ✅ 5. Send Response
        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                last_name: newUser.last_name,
                username: newUser.username,
                email: newUser.email,
                recovery_email: newUser.recovery_email,
                profile_dp: newUser.profile_dp,
                profile_banner: newUser.profile_banner,
                reminders_email: newUser.reminders_email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};
