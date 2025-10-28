import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI, {
// these options are defaults in Mongoose 7+; left here for clarity
// useNewUrlParser: true,
// useUnifiedTopology: true,
});


console.log(`MongoDB connected: ${conn.connection.host}`);
} catch (err) {
console.error(`Error: ${err.message}`);
process.exit(1);
}
};


export default connectDB;