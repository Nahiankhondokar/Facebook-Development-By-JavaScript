import mongoose from "mongoose";


// student shcema design 
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name feild is required'],
        unique : true, 
        trim : true
    }, 
    email : {
        type : String,
        required : [true, 'email feild is required'],
        unique : true, 
        trim : true
    }, 
    cell : {
        type : String,
        required : [true, 'cell feild is required'],
        unique : true, 
        trim : true
    }, 
    age : {
        type : Number,
        required : [true, 'age feild is required'],
        trim : true
    },
    gender : {
        type : String
    },
    username : {
        type : String,
        required : [true, 'username feild is required'],
        trim : true
    }, 
    password : {
        type : String,
        required : [true, 'password feild is required'], 
        trim : true
    }, 
    photo : {
        type : String,
        default : 'avatar.png'
    }, 
    isAdmin : {
        type : Boolean,
        default : false
    }, 
    status : {
        type : Boolean,
        default : true
    }, 
    trash : {
        type : Boolean,
        default : false
    }, 
}, {
    timestamps : true
});





// export default 
export default mongoose.model('users', userSchema);
