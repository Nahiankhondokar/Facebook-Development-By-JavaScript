import mongoose from "mongoose";


// student shcema design 
const userSchema = mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        trim : true
    }, 
    sur_name : {
        type : String,
        required : true,
        trim : true
    }, 
    username : {
        type : String,
        trim : true
    },
    secondary_name : {
        type : String,
        required : true,
        trim : true
    }, 
    email : {
        type : String,
        unique : true,
        trim : true
    }, 
    mobile : {
        type : String,
        unique : true, 
        trim : true
    }, 
    password : {
        type : String,
        required : true,
        trim : true
    }, 
    age : {
        type : Number,
        required : [true, 'age feild is required'],
        trim : true
    },
    gender : {
        type : String,
        enum : ['Male', 'Female', 'Custom']
    },
    birth_date : {
        type : String
    }, 
    profile_photo : {
        type : String,
        default : null
    }, 
    cover_photo : {
        type : String,
        default : null
    }, 
    work : {
        type : Array,
        default : []
    },
    edu : {
        type : Array,
        default : []
    },
    cover_photo : {
        type : String,
        default : null
    },
    living : {
        type : String,
        default : null
    },
    home_town : {
        type : String,
        default : null
    },
    relationship : {
        type : String,
        enum : ['Married', 'Single', 'In a Relationship']
    },
    joined : {
        type : Date 
    },
    social : {
        type : Array,
        default : [] 
    },
    friends : {
        type : Array,
        default : [] 
    },
    follwing : {
        type : Array,
        default : [] 
    },
    follwers : {
        type : Array,
        default : [] 
    },
    request : {
        type : Array,
        default : [] 
    },
    posts : {
        type : Array,
        default : [] 
    },
    block : {
        type : Array,
        default : [] 
    },
    access_token : {
        type : String
    },
    isActivate : {
        type : Boolean,
        default : false
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
