import User from './../models/User.js';
import createError from '../utility/createError.js';
import { isEmail } from '../utility/validate.js';
import { hasPassword, passwordVerify } from '../utility/hash.js';
import { createToken, tokenVerify } from '../utility/token.js';
import { accActivationEmail } from '../utility/sendMail.js';
import { randomCode } from '../utility/math.js';
import JWT from 'jsonwebtoken';


/**
 *  @access Public
 *  @route api/User/register
 *  @method POST
 */
export const register = async (req, res, next) => {
//    console.log(req.body);
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

        // create activation code
        let activationCode = randomCode(10000, 99999);

        // unique activation code checking
        let activateCodeCheck = await User.findOne({access_token : activationCode});
        if(activateCodeCheck){
            let activationCode = randomCode(10000, 99999);
        }

        // user register or create
        const user = await User.create({
            first_name, 
            sur_name, 
            email, 
            password : hasPassword(password), 
            access_token : activationCode,
            gender, 
            birth_date, 
            birth_month, 
            birth_year
        });

        // create activation token 
        const activateToken = createToken({id: user._id}, '30d');
        

        // send mail 
        accActivationEmail(user.email, {
            name : user.first_name +' '+user.sur_name,
            link : `${process.env.APP_URL+':'+process.env.PORT}/api/v1/user/activate/${activateToken}`,
            code : activationCode
        });

        // user created message
        if(user){
            res.status(200).json({ 
                message : "user created",
                user : user
            });
        }

    } catch (error) {
        next(error);
        console.log(error);
    }

}



/**
 *  @access Public
 *  @route api/User/login
 *  @method POST
 */
 export const login = async (req, res, next) => {
   
    try {

        // get all form data
        const { email, password} = req.body;

        // form feilds validation
        if(!email || !password ){
            next(createError(404, 'All Feids are reqired !'));
        }

        // email validation checking
        if(!isEmail(email)){
            next(createError(404, 'Invalid Email !'));
        }

        // valid user checking
        const loginUser = await User.findOne({email});

        // valid user checking
        if(!loginUser){
            next(createError(404, 'User not exists !'));
        }else {

            // user password checking 
            if(!passwordVerify(password, loginUser.password)){
                next(createError(404, 'Wrong Password !'));
            }else {

                // create token 
                const token = createToken({id: loginUser._id}, '365d');

                // user LoggedIn message
                res.status(200).cookie('authToken', token).json({ 
                    message : "user LoggedIn Successfully",
                    user : loginUser, 
                    token : token
                });

            }

        }
        
    } catch (error) {
        next(error);
    }

}


/**
 *  @access Public
 *  @route api/User/account-verfiy
 *  @method POST
 */
 export const accountActivateByLink = async (req, res, next) => {
   
    try {

        // get token
        const {token} = req.params;

        // token exits
        if(!token){
            next(createError(404, "Empty URL"))
        }else {

            // token verify 
            const tokenCheck = tokenVerify(token);

            // token validation 
            if(!tokenCheck){
                next(createError(404, "Invalid Token"));
            }

            // activate account
            if(tokenCheck){
            
                // accoutn details 
                const account = User.findOne({_id : tokenCheck.id});

                // account activation checking
                if(account.isActivate == true){
                    next(createError(404, "Accont Already Activated"));
                }else {
                    await User.findByIdAndUpdate(tokenCheck.id, {
                        isActivate : true,
                        access_token : ''
                    }); 

                    res.status(200).json({
                        message : "account activated"
                    });
                }
            }
        }

        
    } catch (error) {
        next(error);
    }

}


/**
 *  @access Public
 *  @route api/User/activation-code
 *  @method POST
 */
 export const accountActivateByCode = async (req, res, next) => {
   
    try {

        // get activation code
        const {code} = req.body;

        // get inactivete user
        const user = await User.findOne().and([{access_token : code}, {isActivate : false}]);

        // validation
        if(!user){
            next(createError(404, "Account Not Found !"));
        }

        // activate user
        if(user){
            await User.findByIdAndUpdate(user._id, {
                isActivate : true,
                access_token : ''
            });

            res.status(200).json({
                status : "User Activated"
            });
        }

    } catch (error) {
        next(error);
    }

}



/**
 *  @access Public
 *  @route api/User/me
 *  @method POST
 */
 export const loggedInUser = async (req, res, next) => {
   
    try {

        // get token
        const auth_token = req.headers.authorization;

        // get only token
        if(auth_token){
            const token = auth_token.split(' ')[1];

            // get token data
            const user = tokenVerify(token);

            // validation
            if(!user){
                next(createError(404, "Invalid Token !"));
            }

             // get loggedIn User data
             if(user){
                const loggedIn_user = await User.findById(user.id);

                // validaiton
                if(!loggedIn_user){
                    next(createError(404, "LoggedIn User no Found!"));
                }else {
                    res.status(200).json({loggedIn_user});
                }

            }

            
        }

        
        
    } catch (error) {
        next(error);
    }

}
