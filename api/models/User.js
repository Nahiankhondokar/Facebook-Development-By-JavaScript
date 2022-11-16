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
        trim : true, 
        default : ''
    },
    secondary_name : {
        type : String,
        trim : true,
        default : ''
    }, 
    email : {
        type : String,
        trim : true
    }, 
    mobile : {
        type : String,
        trim : true
    }, 
    password : {
        type : String,
        required : true,
        trim : true
    }, 
    age : {
        type : Number,
        trim : true
    },
    gender : {
        type : String,
        enum : ['Male', 'Female', 'Custom']
    },
    birth_date : {
        type : String,
        required : true
    }, 
    birth_month : {
        type : String,
        required : true
    }, 
    birth_year : {
        type : String,
        required : true
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
    following : {
        type : Array,
        default : [] 
    },
    followers : {
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
        type : String,
        default : ''
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
