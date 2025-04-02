import mongoose from "mongoose";

const noteSchama = new mongoose.Schema({
        title: {
            type: String,
            required : true
        },
        content: {
            type: String,
            required : true
        },
        background: {
            type: String,
            required : true
        }
}, { timestamps: true })

const noteModel = mongoose.model('notes' , noteSchama)

export default noteModel