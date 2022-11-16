import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import mongoDBConnection from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.js';


// express initialize
const app = express();


// environment setup
dotenv.config();
const PORT = process.env.PORT || 5000;


// Post data Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());



// api rotues
app.use('/api/v1/user', userRoute);


// custom error handler middleware
app.use(errorHandler);

// server listen
app.listen(PORT, () => {
    // mongoDB connection
    mongoDBConnection();
    console.log(`Server is listening on port ${PORT}`.bgGreen.black);  
});