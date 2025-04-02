import mongoose from "mongoose";

const connectDB = async() => {
        try {
            await mongoose.connect('mongodb+srv://shahbazansari8199:Z2QuDUfOIfcVOQ7l@cluster0.4d27y.mongodb.net/fly-high?retryWrites=true&w=majority');
            console.log('mongoDB connect Successfully!');
        } catch (error) {
            console.log('MongoDB connection error:', error);
        }
}

export default connectDB