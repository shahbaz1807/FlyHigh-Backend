import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    recovery_email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_dp: {
        type: String,
        required: true
    },
    profile_banner: {
        type: String,
        required: true
    },
    lastSeenHistory: [{
        type: Date,
        default: []
    }],
    bio: {
        type: String,
        default: "",
        maxlength: 200
    },
    reminders_email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const profileModel = mongoose.models.profiles || mongoose.model("profiles", profileSchema);
export default profileModel;
