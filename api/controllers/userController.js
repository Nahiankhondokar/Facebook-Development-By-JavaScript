import User from './../models/User.js';
import createError from '../utility/createError.js';


/**
 *  @access Public
 *  @route api/User/register
 *  @method POST
 */
export const register = async (req, res, next) => {
   
    res.send('user register okay');

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
