import User from './../models/User.js';
import createError from '../utility/createError.js';
import { isEmail } from '../utility/validate.js';
import { hasPassword } from '../utility/hash.js';
import { createToken } from '../utility/token.js';


/**
 *  @access Public
 *  @route api/User/register
 *  @method POST
 */
export const register = async (req, res, next) => {
   
    try {
        
        // get all form data
        const { first_name, sur_name, email, password, gender, birth_date, birth_month, birth_year } = req.body;

        // form feilds validation
        if(!first_name || !sur_name || !email || !password ){
            next(createError(404, 'All Feids are reqired !'));
        }

        // email validation checking
        if(!isEmail(email)){
            next(createError(404, 'Invalid Email !'));
        }

        // valid user checking
        const emailUser = await User.findOne({email});

        // valid user checking
        if(emailUser){
            next(createError(404, 'Eamil alredy exists !'));
        }

        // user register or create
        const user = await User.create({
            first_name, sur_name, email, password : hasPassword(password), gender, birth_date, birth_month, birth_year
        });

        // create token 
        const token = createToken({id: user._id}, '365d');

        // user created message
        if(user){
            res.status(200).json({ 
                message : "user created",
                user : user, 
                token : token
            });
        }

    } catch (error) {
        
    }

}



/**
 *  @access Public
 *  @route api/User/login
 *  @method POST
 */
 export const login = async (req, res, next) => {
   
    res.send('user login okay');

}


/**
 *  @access Public
 *  @route api/User/me
 *  @method POST
 */
 export const loggedInUser = async (req, res, next) => {
   
    res.send('loggedInUser okay');

}
