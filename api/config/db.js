import mongoose from "mongoose";

// mongoDB connection
const mongoDBConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_STRING);
    console.log(`MONGDB is Connected`.bgBlue.black);
  } catch (err) {
    console.log(`Mongoose server ${err}`.bgRed.black);
  }
};

// export default
export default mongoDBConnection;
